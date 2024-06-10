import React, { useState, useEffect } from 'react';
import { Form, Button, Header, Dropdown, DropdownProps } from 'semantic-ui-react';
import { Expense } from '../models/budget';
import { categoryOptions, updateSubcategoryOptions } from './CategoryOptions';

interface ExpenseFormProps {
  onExpenseChange: (index: number, expense: Expense) => void;
  onAddExpense: () => void;
  onRemoveExpense: (index: number) => void;
  expenses: Expense[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onExpenseChange, onAddExpense, onRemoveExpense, expenses }) => {
  const [subcategoryOptions, setSubcategoryOptions] = useState<any[]>([]);
  const [individualSubcategories, setIndividualSubcategories] = useState<{ [key: number]: any[] }>({});
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    recalculateTotalExpense();
  }, [expenses]);

  const handleExpenseChange = (index: number, name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let parsedValue: string | number = value;
    if (name === 'amount') {
      parsedValue = parseFloat(value);
    }
    if (!isNaN(parsedValue as number)) {
      const updatedExpense = { ...expenses[index], [name]: parsedValue };
      onExpenseChange(index, updatedExpense);
      recalculateTotalExpense();
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updatedExpense = { ...expenses[index], category: value };
    onExpenseChange(index, updatedExpense);
    const subcategoryOptions = updateSubcategoryOptions(value);
    setIndividualSubcategories((prev) => ({ ...prev, [index]: subcategoryOptions }));
  };

  const handleSubcategoryChange = (index: number, value: string) => {
    const updatedExpense = { ...expenses[index], subcategory: value };
    onExpenseChange(index, updatedExpense);
    setIndividualSubcategories((prev) => ({
      ...prev,
      [index]: updateSubcategoryOptions(expenses[index].category),
    }));
  };

  const recalculateTotalExpense = () => {
    const total = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
    setTotalExpense(total);
  };

  return (
    <>
      <Header as="h3">Utgifter</Header>
      {expenses.map((expense, index) => (
        <Form.Group key={index}>
          <Form.Field width={4}>
            <label>Kategori</label>
            <Dropdown
              selection
              fluid
              options={categoryOptions}
              value={expense.category}
              onChange={(_e, data: DropdownProps) => handleCategoryChange(index, data.value as string)}
              placeholder='Velg kategori'
              search
              allowAdditions
              additionLabel='Legg til'
            />
          </Form.Field>
          <Form.Field width={4}>
            <label>Underkategori</label>
            <Dropdown
              selection
              fluid
              options={individualSubcategories[index] || subcategoryOptions}
              value={expense.subcategory}
              onChange={(_e, data: DropdownProps) => handleSubcategoryChange(index, data.value as string)}
              placeholder='Velg underkategori'
              search
              allowAdditions
              additionLabel='Legg til'
            />
          </Form.Field>
          <Form.Field width={4}>
            <label>Beskrivelse</label>
            <input
              type="text"
              name="description"
              placeholder="Valgfri beskrivelse"
              value={expense.description}
              onChange={handleExpenseChange(index, 'description')}
            />
          </Form.Field>
          <Form.Field width={4}>
            <label>Beløp</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter expense amount"
              value={expense.amount}
              onChange={handleExpenseChange(index, 'amount')}
            />
          </Form.Field>
          <Button type="button" onClick={() => onRemoveExpense(index)}>Fjern</Button>
        </Form.Group>
      ))}

      <Button type="button" onClick={onAddExpense}>Legg til utgift</Button>
      <div style={{ marginTop: '20px' }}>
        <Header as="h5">SUM - Utgifter</Header>
        <p>{totalExpense}</p>
      </div>
    </>
  );
};

export default ExpenseForm;
