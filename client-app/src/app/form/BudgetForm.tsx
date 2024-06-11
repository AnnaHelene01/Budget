import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Container, Form, Header, Icon, Segment } from 'semantic-ui-react';
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
    totalNetIncome: 0,
    totalExpense: 0,
    incomes: [],
    expenses: []
  });

  useEffect(() => {
    if (id) loadBudget(id).then(budget => setBudget(budget!));
  }, [id, loadBudget]);

  function handleSubmit() {
    // Validering av inntekter og utgifter
    if (budget.incomes.some(income => !income.source || income.grossAmount <= 0 || income.taxPercentage < 0)) {
      console.error('Invalid income data:', budget.incomes);
      return;
    }
    if (budget.expenses.some(expense => !expense.description || expense.amount <= 0)) {
      console.error('Invalid expense data:', budget.expenses);
      return;
    }

    // Generer UUID-er for alle inntekter og utgifter som ikke har et ID
    const updatedIncomes = budget.incomes.map(income => ({
      ...income,
      id: income.id || uuid()
    }));

    const updatedExpenses = budget.expenses.map(expense => ({
      ...expense,
      id: expense.id || uuid()
    }));

    const updatedBudget = {
      ...budget,
      incomes: updatedIncomes,
      expenses: updatedExpenses
    };

    console.log('Submitting budget:', updatedBudget); // Log dataene som sendes

    if (!updatedBudget.id) {
      updatedBudget.id = uuid();
      createBudget(updatedBudget)
        .then(() => navigate(`/budget/${updatedBudget.id}`))
        .catch(error => console.error('Error creating budget:', error.response?.data || error.message));
    } else {
      updateBudget(updatedBudget)
        .then(() => navigate(`/budget/${updatedBudget.id}`))
        .catch(error => console.error('Error updating budget:', error.response?.data || error.message));
    }
  }

  useEffect(() => {
    const totalExpense = budget.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setBudget(prev => ({ ...prev, totalExpense }));
  }, [budget.expenses]);

  useEffect(() => {
    const totalGrossIncome = budget.incomes.reduce((acc, income) => acc + income.grossAmount, 0);
    const totalNetIncome = budget.incomes.reduce(
      (acc, income) => acc + income.grossAmount - (income.grossAmount * income.taxPercentage) / 100,
      0
    );
    setBudget(prev => ({ ...prev, totalNetIncome, totalIncome: totalGrossIncome }));
  }, [budget.incomes]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setBudget({ ...budget, [name]: value });
  }

  const handleIncomeChange = (index: number, updatedIncome: Income) => {
    const updatedIncomes = [...budget.incomes];
    updatedIncomes[index] = updatedIncome;
    setBudget({ ...budget, incomes: updatedIncomes });
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
    setBudget({ ...budget, incomes: updatedIncomes });
  };

  const handleExpenseChange = (index: number, updatedExpense: Expense) => {
    const updatedExpenses = [...budget.expenses];
    updatedExpenses[index] = updatedExpense;
    setBudget({ ...budget, expenses: updatedExpenses });
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
    setBudget({ ...budget, expenses: updatedExpenses });
  };

  if (loadingInitial) return <LoadingComponent content='Loading budget...' />;

  return (
    <Container style={{ marginTop: '8rem', marginBottom: '8rem' }}>
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
            <Header.Content>Inntekter</Header.Content>
          </Header>
          <IncomeForm
            incomes={budget.incomes}
            onIncomeChange={handleIncomeChange}
            onAddIncome={handleAddIncome}
            onRemoveIncome={handleRemoveIncome}
          />
        </Segment>

        <Segment>
          <Header as="h3">
            <Icon name="arrow down" />
            <Header.Content>Utgifter</Header.Content>
          </Header>
          <ExpenseForm
            expenses={budget.expenses}
            onExpenseChange={handleExpenseChange}
            onAddExpense={handleAddExpense}
            onRemoveExpense={handleRemoveExpense}
          />
        </Segment>

        <Button type="submit" primary>Få Oversikt</Button>
        <Button type='button' onClick={() => navigate('/budgets')}>Avbryt</Button>
      </Form>
    </Container>
  );
});
