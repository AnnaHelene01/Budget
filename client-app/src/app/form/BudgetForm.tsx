import { useEffect, useState } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import '../../App.css';

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
  const [incomes, setIncomes] = useState<Income[]>([{ source: '', grossAmount: 0, taxPercentage: 0 }]);
  const [expenses, setExpenses] = useState<Expense[]>([{ description: '', amount: 0 }]);
  const [budgetName, setBudgetName] = useState('');
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [netIncome, setNetIncome] = useState<number>(0);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);

  useEffect(() => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });
    setTotalExpense(totalExpense);
  }, [expenses]);

  useEffect(() => {
    let totalGrossIncome = 0;
    let totalNetIncome = 0;

    incomes.forEach((income) => {
      totalGrossIncome += income.grossAmount;
      totalNetIncome += income.grossAmount - (income.grossAmount * income.taxPercentage) / 100;
    });

    setTotalIncome(totalGrossIncome);
    setNetIncome(totalNetIncome);
  }, [incomes]);

  useEffect(() => {
    const remaining = totalIncome - totalExpense;
    setRemainingAmount(remaining);
  }, [totalIncome, totalExpense]);

  const handleIncomeChange = (index: number, income: Income) => {
    const updatedIncomes = [...incomes];
    updatedIncomes[index] = income;
    setIncomes(updatedIncomes);
  };

  const handleAddIncome = () => {
    setIncomes([...incomes, { source: '', grossAmount: 0, taxPercentage: 0 }]);
  };

  const handleRemoveIncome = (index: number) => {
    const updatedIncomes = [...incomes];
    updatedIncomes.splice(index, 1);
    setIncomes(updatedIncomes);
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
    console.log('Submitting:', { budgetName, incomes, expenses });
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
        <IncomeForm 
          incomes={incomes} 
          onIncomeChange={handleIncomeChange} 
          onAddIncome={handleAddIncome} 
          onRemoveIncome={handleRemoveIncome} 
        />
        <div style={{ marginTop: '20px' }}>
          <Header as="h5">Netto Inntekt</Header>
          <p>{netIncome}</p>
        </div>
        <ExpenseForm
          expenses={expenses}
          onExpenseChange={handleExpenseChange}
          onAddExpense={handleAddExpense}
          onRemoveExpense={handleRemoveExpense}
        />
        <div style={{ display: 'flex', marginBottom: '3rem', marginTop: '3rem'}}>
            <div style={{ marginTop: '20px', paddingRight: '1rem' }}>
              <Header as="h3">Totalt Inntekt</Header>
              <p>{totalIncome}</p>
            </div>
            <div style={{ marginTop: '20px', paddingLeft: '1rem', paddingRight: '1rem' }}>
              <Header as="h3">Totalt Utgift</Header>
              <p>{totalExpense}</p>
            </div>
            <div style={{ marginTop: '20px', paddingLeft: '1rem' }}>
              <Header as="h3">Sum Penger Igjen</Header>
              <p>{remainingAmount}</p>
            </div>
        </div>
        <Button type="submit" primary>Få Oversikt</Button>
      </Form>
    </Container>
  );
};

export default BudgetForm;
