import { useEffect, useState, ChangeEvent } from 'react';
import { Button, Container, Form, Header, Icon, Segment, Modal } from 'semantic-ui-react';
import { Budget, Expense, Income } from '../models/budget';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import { useStore } from '../stores/store';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

export default observer(function BudgetForm() {
  const { budgetStore } = useStore();
  const { createBudget, updateBudget, loadBudget, loadingInitial } = budgetStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [budget, setBudget] = useState<Budget>({
    id: '',
    name: '',
    totalGrossIncome: 0,
    totalNetIncome: 0,
    totalExpense: 0,
    netAmount: 0,
    incomes: [],
    expenses: []
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      loadBudget(id).then(budget => {
        if (budget) {
          const updatedBudget = {
            ...budget,
            incomes: budget.incomes || [],
            expenses: budget.expenses || []
          };
          setBudget(updatedBudget);
        }
      });
    }
  }, [id, loadBudget]);

  useEffect(() => {
    const totalGrossIncome = budget.incomes.reduce((total, income) => total + income.grossAmount, 0);
    const totalNetIncome = budget.incomes.reduce((total, income) => total + income.netAmount, 0);
    const totalExpense = budget.expenses.reduce((total, expense) => total + expense.amount, 0);
    const netAmount = totalNetIncome - totalExpense;

    setBudget(prev => ({
      ...prev,
      totalGrossIncome,
      totalNetIncome,
      totalExpense,
      netAmount
    }));
  }, [budget.incomes, budget.expenses]);

  // Flytt ut funksjoner for å rense inntekter og utgifter
  const cleanIncome = (income: Income) => ({
    source: income.source,
    grossAmount: income.grossAmount,
    netAmount: income.netAmount,
    taxPercentage: income.taxPercentage
  });

  const cleanExpense = (expense: Expense) => ({
    category: expense.category,
    subcategory: expense.subcategory,
    description: expense.description,
    amount: expense.amount
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Forhindre standard submit handling

    // Rens budsjettdataene
    const cleanedBudget: Omit<Budget, 'incomes' | 'expenses'> & {
      incomes: ReturnType<typeof cleanIncome>[];
      expenses: ReturnType<typeof cleanExpense>[];
    } = {
      ...budget,
      incomes: budget.incomes.map(cleanIncome),
      expenses: budget.expenses.map(cleanExpense)
    };

    // Vise modal hvis utgiftene overstiger inntektene
    if (cleanedBudget.netAmount < 0) {
      setIsModalOpen(true);
      setIsSubmitting(true); // Sett isSubmitting til true når modal er åpen
    } else {
      // Hvis ikke i modal, send skjemaet umiddelbart
      submitBudget(cleanedBudget);
    }
  }

  function submitBudget(cleanedBudget: Omit<Budget, 'incomes' | 'expenses'> & {
    incomes: ReturnType<typeof cleanIncome>[];
    expenses: ReturnType<typeof cleanExpense>[];
  }) {
    if (!cleanedBudget.id) {
      cleanedBudget.id = uuid(); // Generer ID kun ved opprettelse
      createBudget(cleanedBudget)
        .then(() => navigate(`/budget/${cleanedBudget.id}`))
        .catch(error => console.error('Error creating budget:', error.response?.data || error.message));
    } else {
      updateBudget(cleanedBudget)
        .then(() => navigate(`/budget/${cleanedBudget.id}`))
        .catch(error => console.error('Error updating budget:', error.response?.data || error.message));
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (isSubmitting) {
      // Hvis modal var åpen og er lukket, send skjemaet
      submitBudget({
        ...budget,
        incomes: budget.incomes.map(cleanIncome),
        expenses: budget.expenses.map(cleanExpense)
      });
      setIsSubmitting(false); // Nullstill isSubmitting etter innsending
    }
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setBudget(prev => ({ ...prev, [name]: value }));
  }

  const handleIncomeChange = (index: number, updatedIncome: Income) => {
    const updatedIncomes = [...budget.incomes];
    updatedIncomes[index] = updatedIncome;
    setBudget(prev => ({ ...prev, incomes: updatedIncomes }));
  };

  const handleAddIncome = () => {
    setBudget(prev => ({
      ...prev,
      incomes: [
        ...prev.incomes,
        { id: uuid(), source: '', grossAmount: 0, netAmount: 0, taxPercentage: 0 }
      ]
    }));
  };

  const handleRemoveIncome = (index: number) => {
    const updatedIncomes = [...budget.incomes];
    updatedIncomes.splice(index, 1);
    setBudget(prev => ({ ...prev, incomes: updatedIncomes }));
  };

  const handleExpenseChange = (index: number, updatedExpense: Expense) => {
    const updatedExpenses = [...budget.expenses];
    updatedExpenses[index] = updatedExpense;
    setBudget(prev => ({ ...prev, expenses: updatedExpenses }));
  };

  const handleAddExpense = () => {
    setBudget(prev => ({
      ...prev,
      expenses: [
        ...prev.expenses,
        { id: uuid(), description: '', amount: 0, category: '', subcategory: '' }
      ]
    }));
  };

  const handleRemoveExpense = (index: number) => {
    const updatedExpenses = [...budget.expenses];
    updatedExpenses.splice(index, 1);
    setBudget(prev => ({ ...prev, expenses: updatedExpenses }));
  };

  if (loadingInitial) return <LoadingComponent content='Loading budget...' />;
  return (
    <Container style={{ marginTop: '10em', marginBottom: '8rem' }}>
        <Header as="h2" icon textAlign="center">
            <Icon name="money bill alternate" circular />
            <Header.Content>Budsjett Skjema</Header.Content>
        </Header>

        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Segment>
                <Header as="h3">
                    <Icon name="edit" />
                    <Header.Content>Budsjett Navn</Header.Content>
                </Header>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="Enter budget name"
                        value={budget.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                </Form.Field>
            </Segment>

            <Segment>
                <Header as="h3">
                    <Icon name="arrow up" />
                    <Header.Content> Inntekter </Header.Content>
                </Header>
                <IncomeForm
                    incomes={budget.incomes}
                    onIncomeChange={handleIncomeChange}
                    onRemoveIncome={handleRemoveIncome}
                    isEditMode={isEditMode}
                />
                <Button onClick={handleAddIncome} type="button" color="green" icon style={{ marginTop: '20px' }}>
                    <Icon name="plus" />
                    Legg til inntekt
                </Button>
            </Segment>

            <Segment>
                <Header as="h3">
                    <Icon name="arrow down" />
                    <Header.Content>Utgifter</Header.Content>
                </Header>
                <ExpenseForm
                    expenses={budget.expenses}
                    onExpenseChange={handleExpenseChange}
                    onRemoveExpense={handleRemoveExpense}
                    isEditMode={isEditMode}
                />
                <Button onClick={handleAddExpense} type="button" color="green" icon style={{ marginTop: '20px' }}>
                    <Icon name="plus" />
                    Legg til utgift
                </Button>
            </Segment>

            <Button type="submit" primary>Få Oversikt</Button>
            <Button type='button' onClick={() => navigate('/budget')}>Avbryt</Button>
        </Form>

        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            size="small"
        >
            <Header icon='warning' content='Advarsel!' />
            <Modal.Content>
                <p>Utgiftene dine overstiger inntektene. Vurder å redusere utgiftene dine.</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={handleModalClose}>
                    <Icon name='checkmark' /> Gå Videre
                </Button>
                <Button color='grey' onClick={() => setIsModalOpen(false)}>
                    <Icon name='close' /> Avbryt
                </Button>
            </Modal.Actions>
        </Modal>
    </Container>
);
});
