import { Container, Header } from "semantic-ui-react";
import DisplayBudget from "../budgets/DisplayBudget";
import { Budget } from "../../app/models/budget";

interface Props {
  budgets: Budget[];
  selectedBudget: Budget | undefined;
  selectBudget: (id: string) => void;
  deleteBudget: (id: string) => void;
}

export default function BudgetList({
  budgets,
  selectBudget,
  deleteBudget,
}: Props) {

  return (
    <Container style={{ marginTop: '8rem', marginBottom: '8rem' }}>
      <Header as="h1">Mine Budsjett</Header>
      <DisplayBudget 
        budgets={budgets}
        selectBudget={selectBudget}
        deleteBudget={deleteBudget}
      />
    </Container>
  );
}
