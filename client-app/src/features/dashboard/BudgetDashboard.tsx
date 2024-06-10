import { Container, Header } from "semantic-ui-react";
import BudgetForm from "../../app/form/BudgetForm";
import DisplayBudget from "../budgets/DisplayBudget";
import { Budget } from "../../app/models/budget";

interface Props {
  budgets: Budget[];
  selectedBudget: Budget | undefined;
  selectBudget: (id: string) => void;
  editMode: boolean;
  closeForm: () => void;
  createOrEdit: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
}

export default function BudgetDashboard({
  budgets,
  selectedBudget,
  selectBudget,
  closeForm,
  //editMode,
  createOrEdit,
  deleteBudget
}: Props) {

  //console.log("Budgets received in BudgetDashboard:", budgets);

  return (
    <Container style={{ marginTop: '8rem' }}>
      <Header as="h1">Lag ditt skreddersydde budsjett!</Header>
      <DisplayBudget 
        budgets={budgets}
        selectBudget={selectBudget}
        deleteBudget={deleteBudget}
      />
     
        <BudgetForm 
          closeForm={closeForm}
          budget={selectedBudget}
          createOrEdit={createOrEdit}
        />
    </Container>
  );
}
