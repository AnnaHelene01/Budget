import React, { useEffect, useState } from 'react';
import { Button, Icon, Grid, Input, Form as SemanticForm } from 'semantic-ui-react';
import { Income } from '../models/budget';

interface IncomeFormProps {
  incomes: Income[];
  onIncomeChange: (index: number, income: Income) => void;
  onAddIncome: () => void;
  onRemoveIncome: (index: number) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ incomes, onIncomeChange, onAddIncome, onRemoveIncome }) => {
  const [totalGrossIncome, setTotalGrossIncome] = useState<number>(0);
  const [totalNetIncome, setTotalNetIncome] = useState<number>(0); // Legg til totalNetIncome state

  useEffect(() => {
    recalculateTotalIncomes();
  }, [incomes]);

  const recalculateTotalIncomes = () => {
    const grossTotal = incomes.reduce((acc, income) => acc + (income.grossAmount || 0), 0);
    const netTotal = incomes.reduce((acc, income) => acc + calculateNetAmount(income), 0);
    setTotalGrossIncome(grossTotal);
    setTotalNetIncome(netTotal);
  };

  const handleIncomeChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "grossAmount" || name === "taxPercentage" ? parseFloat(value) : value;
    onIncomeChange(index, { ...incomes[index], [name]: parsedValue });
  };

  const calculateNetAmount = (income: Income) => {
    return income.grossAmount - (income.grossAmount * income.taxPercentage) / 100;
  };

  return (
    <>
      {incomes.map((income, index) => (
        <Grid key={index} columns={4} stackable>
          <Grid.Row>
            <Grid.Column>
              <SemanticForm.Field>
                <label>Kilde</label>
                <Input
                  type="text"
                  name="source"
                  placeholder="Enter income source"
                  value={income.source}
                  onChange={(e) => handleIncomeChange(index, e)}
                />
              </SemanticForm.Field>
            </Grid.Column>
            <Grid.Column>
              <SemanticForm.Field>
                <label>Brutto i måneden</label>
                <Input
                  type="number"
                  name="grossAmount"
                  placeholder="Enter gross amount"
                  value={income.grossAmount}
                  onChange={(e) => handleIncomeChange(index, e)}
                />
              </SemanticForm.Field>
            </Grid.Column>
            <Grid.Column>
              <SemanticForm.Field>
                <label>Skatt i prosent</label>
                <Input
                  type="number"
                  name="taxPercentage"
                  placeholder="Enter tax percentage"
                  value={income.taxPercentage}
                  onChange={(e) => handleIncomeChange(index, e)}
                />
              </SemanticForm.Field>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Button icon color="red" onClick={() => onRemoveIncome(index)}>
                <Icon name="trash" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ))}
      <Button onClick={onAddIncome} type="button" color="green" icon style={{ marginTop: '20px' }}>
        <Icon name="plus" />
        Legg til inntekt
      </Button>
      <p style={{ marginTop: '20px' }}>
        Total Brutto Inntekt: <strong>{totalGrossIncome}</strong>
      </p>
      <p style={{ marginTop: '20px' }}>
        Total Netto Inntekt: <strong>{totalNetIncome}</strong>
      </p>
    </>
  );
};

export default IncomeForm;
