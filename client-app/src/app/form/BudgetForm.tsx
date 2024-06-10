import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Container, Form, Header, Icon, Segment } from 'semantic-ui-react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import '../../App.css';
import { Budget, Income, Expense } from '../models/budget';

interface Props {
  budget: Budget | undefined;
  closeForm: () => void;
  createOrEdit: (budget: Budget) => void;
}

export default function BudgetForm({ budget: selectedBudget, closeForm, createOrEdit }: Props) {
  const initialState: Budget = selectedBudget ?? {
    id: '',
    name: '',
    totalNetIncome: 0,
    totalExpense: 0,
    incomes: [],
    expenses: []
  };

  const [budget, setBudget] = useState<Budget>(initialState);

  useEffect(() => {
    const totalExpense = budget.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setBudget((prev) => ({ ...prev, totalExpense }));
  }, [budget.expenses]);

  useEffect(() => {
    const totalGrossIncome = budget.incomes.reduce((acc, income) => acc + income.grossAmount, 0);
    const totalNetIncome = budget.incomes.reduce(
      (acc, income) => acc + income.grossAmount - (income.grossAmount * income.taxPercentage) / 100,
      0
    );
    setBudget((prev) => ({ ...prev, totalNetIncome, totalIncome: totalGrossIncome }));
  }, [budget.incomes]);

  useEffect(() => {
    const remainingAmount = budget.totalNetIncome - budget.totalExpense;
    setBudget((prev) => ({ ...prev, remainingAmount }));
  }, [budget.totalNetIncome, budget.totalExpense]);

  function handleSubmit() {
    createOrEdit(budget);
  }

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
    setBudget({ ...budget, incomes: [...budget.incomes, { id: '', source: '', grossAmount: 0, netAmount: 0, taxPercentage: 0 }] });
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
    setBudget({ ...budget, expenses: [...budget.expenses, { id: '', description: '', amount: 0, category: '', subcategory: '' }] });
  };

  const handleRemoveExpense = (index: number) => {
    const updatedExpenses = [...budget.expenses];
    updatedExpenses.splice(index, 1);
    setBudget({ ...budget, expenses: updatedExpenses });
  };

  return (
    <Container>
    <Header as="h2" icon textAlign="center">
      <Icon name="money bill alternate" circular />
      <Header.Content>Budsjett Skjema</Header.Content>
    </Header>

    <Segment>
      <Header as="h3">
        <Icon name="edit" />
        <Header.Content>Budsjett Navn</Header.Content>
      </Header>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Field>
          <input
            type="text"
            placeholder="Enter budget name"
            value={budget.name}
            name="name"
            onChange={handleInputChange}
          />
        </Form.Field>
      </Form>
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
    <Button type='button' onClick={closeForm}>Avbryt</Button>
  </Container>
  );
}
