import React from 'react';
import { Form, Header, Button, Icon } from 'semantic-ui-react';
import { Income } from '../models/budget';

interface IncomeFormProps {
  incomes: Income[];
  onIncomeChange: (index: number, income: Income) => void;
  onAddIncome: () => void;
  onRemoveIncome: (index: number) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ incomes, onIncomeChange, onAddIncome, onRemoveIncome }) => {
  const handleIncomeChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "grossAmount" || name === "taxPercentage" ? parseFloat(value) : value;
    onIncomeChange(index, { ...incomes[index], [name]: parsedValue });
  };

  return (
    <>
      <Header as="h3">Inntekter</Header>
      {incomes.map((income, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <Form.Field>
            <label>Kilde</label>
            <input
              type="text"
              name="source"
              placeholder="Enter income source"
              value={income.source}
              onChange={(e) => handleIncomeChange(index, e)}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Brutto i måneden</label>
              <input
                type="number"
                name="grossAmount"
                placeholder="Enter gross amount"
                value={income.grossAmount}
                onChange={(e) => handleIncomeChange(index, e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Skatt i prosent</label>
              <input
                type="number"
                name="taxPercentage"
                placeholder="Enter tax percentage"
                value={income.taxPercentage}
                onChange={(e) => handleIncomeChange(index, e)}
              />
            </Form.Field>
            <Button
              icon
              color='red'
              onClick={() => onRemoveIncome(index)}
              style={{ alignSelf: 'center', marginTop: '1.5rem' }}
            >
              <Icon name='trash' />
            </Button>
          </Form.Group>
        </div>
      ))}
      <Button onClick={onAddIncome} color='green'>
        Legg til inntekt
      </Button>
    </>
  );
};

export default IncomeForm;
