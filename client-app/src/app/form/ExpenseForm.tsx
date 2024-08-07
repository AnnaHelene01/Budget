import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownProps, Grid, Icon } from 'semantic-ui-react';
import { Expense } from '../models/budget';
import { categoryOptions, updateSubcategoryOptions } from './CategoryOptions';
import { observer } from 'mobx-react-lite';

interface ExpenseFormProps {
  onExpenseChange: (index: number, expense: Expense) => void;
  onRemoveExpense: (index: number) => void;
  expenses: Expense[];
  isEditMode: boolean;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onExpenseChange, onRemoveExpense, expenses }) => {
  const safeExpenses = expenses || [];
  const [individualSubcategories, setIndividualSubcategories] = useState<{ [key: number]: any[] }>({});
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    recalculateTotalExpense();
  }, [expenses]);

  const handleExpenseChange = (index: number, name: keyof Expense) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = name === 'amount' ? parseFloat(value) : value;
    const updatedExpense = { ...expenses[index], [name]: parsedValue };
    onExpenseChange(index, updatedExpense);
    recalculateTotalExpense();
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updatedExpense = { ...expenses[index], category: value, subcategory: '' };
    onExpenseChange(index, updatedExpense);
    const subcategoryOptions = updateSubcategoryOptions(value);
    setIndividualSubcategories((prev) => ({ ...prev, [index]: subcategoryOptions }));
  };

  const handleSubcategoryChange = (index: number, value: string) => {
    const updatedExpense = { ...expenses[index], subcategory: value };
    onExpenseChange(index, updatedExpense);
  };

  const recalculateTotalExpense = () => {
    const total = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
    setTotalExpense(total);
  };
  
  return (
    <>
      <Grid columns={5} stackable>
        {safeExpenses.map((expense, index) => (
          <Grid.Row key={index}>
            <Grid.Column>
              <Form.Field>
                <label>Kategori</label>
                <Dropdown
                  selection
                  fluid
                  options={categoryOptions}
                  value={expense.category}
                  onChange={(_e, data: DropdownProps) => handleCategoryChange(index, data.value as string)}
                  placeholder="Velg kategori"
                  search
                  allowAdditions
                  additionLabel="Legg til"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Underkategori</label>
                <Dropdown
                  selection
                  fluid
                  options={individualSubcategories[index] || []}
                  value={expense.subcategory}
                  onChange={(_e, data: DropdownProps) => handleSubcategoryChange(index, data.value as string)}
                  placeholder="Velg underkategori"
                  search
                  allowAdditions
                  additionLabel="Legg til"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Beskrivelse</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={expense.description}
                  onChange={handleExpenseChange(index, 'description')}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Beløp</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={expense.amount}
                  onChange={handleExpenseChange(index, 'amount')}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Button icon color="red" onClick={() => onRemoveExpense(index)}>
                <Icon name="trash" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
      <p style={{ marginTop: '20px' }}>
        Total utgift: <strong>{totalExpense}</strong>
      </p>
    </>
  );
};

export default observer(ExpenseForm);
