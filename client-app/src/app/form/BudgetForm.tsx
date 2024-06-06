import { useEffect, useState } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';

type Expense = {
  description: string;
  amount: number;
};

type Income = {
  source: string;
  grossAmount: number;
  taxPercentage: number;
};

const BudgetForm = () => {
  const [income, setIncome] = useState<Income>({ source: '', grossAmount: 0, taxPercentage: 0 });
  const [expenses, setExpenses] = useState<Expense[]>([{ description: '', amount: 0 }]);
  const [budgetName, setBudgetName] = useState('');

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount; // Legg til beløpet som utgift uavhengig av om det er positivt eller negativt
    });
    setTotalExpense(totalExpense); // Oppdater totalutgiftene
  }, [expenses]);
  
  

  const handleIncomeChange = (income: Income) => {
    setIncome(income);
  };

  const handleExpenseChange = (index: number, expense: Expense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = expense;
    setExpenses(updatedExpenses);
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, { description: '', amount: 0 }]);
  };

  const handleRemoveExpense = (index: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleSubmit = () => {
    console.log('Submitting:', { budgetName, income, expenses });
  };

  return (
    <Container className="budget-form-container">
      <Header as="h2">BUDSJETT SKJEMA</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Budsjett Navn</label>
          <input
            type="text"
            placeholder="Enter budget name"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
          />
        </Form.Field>
        <IncomeForm onIncomeChange={handleIncomeChange} />
        <ExpenseForm
          expenses={expenses}
          onExpenseChange={handleExpenseChange}
          onAddExpense={handleAddExpense}
          onRemoveExpense={handleRemoveExpense}
        />
          <div style={{ marginTop: '20px' }}>
        <Header as="h4">Totalt Inntekt</Header>
        <p>{totalIncome}</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Header as="h4">Totalt Utgift</Header>
        <p>{totalExpense}</p>
      </div>
        <Button type="submit" primary>Få Oversikt</Button>
      </Form>
    </Container>
  );
};

export default BudgetForm;
