import React, { useState } from 'react';
import { Form, Header } from 'semantic-ui-react';

interface IncomeFormProps {
  onIncomeChange: (income: any) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onIncomeChange }) => {
  const [income, setIncome] = useState({ source: '', grossAmount: 0, taxPercentage: 0 });

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: value });
    onIncomeChange({ ...income, [name]: value }); // Oppdater parent state
  };

  return (
    <>
      <Header as="h3">Inntekter</Header>
      <Form.Field>
        <label>Kilde</label>
        <input
          type="text"
          name="source"
          placeholder="Enter income source"
          value={income.source}
          onChange={handleIncomeChange}
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
            onChange={handleIncomeChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Skatt i prosent</label>
          <input
            type="number"
            name="taxPercentage"
            placeholder="Enter tax percentage"
            value={income.taxPercentage}
            onChange={handleIncomeChange}
          />
        </Form.Field>
      </Form.Group>
    </>
  );
};

export default IncomeForm;
