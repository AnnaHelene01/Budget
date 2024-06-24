import { Container, Header, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import BudgetListItem from "./BudgetListItem";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function BudgetList() {
  const { budgetStore } = useStore();
  const { budgetRegistry, loadBudgets, loadingInitial } = budgetStore;

  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  if (loadingInitial) return <LoadingComponent content="Laster inn budsjett..." />;

  return (
    <Container style={{ marginTop: '8rem', marginBottom: '8rem' }}>
      <Header as="h1" style={{ marginTop: '5em', marginBottom: '2em' }}>Mine Budsjett</Header>
      <Grid columns={2} stackable>
        {Array.from(budgetRegistry.values()).map(budget => (
          <Grid.Column key={budget.id}>
            <BudgetListItem budget={budget} />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
});
