import { Button, Card, Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function BudgetList() {
  const { budgetStore } = useStore();
  const { deleteBudget, loading, budgetRegistry, loadBudgets, loadingInitial } = budgetStore;

  useEffect(() => {
    if (budgetRegistry.size === 0) {
      loadBudgets().catch((error) => console.error("Failed to load budgets", error));
    }
  }, [budgetRegistry.size, loadBudgets]);

  const [target, setTarget] = useState('');

  function handleBudgetDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteBudget(id);
  }

  if (loadingInitial) return <LoadingComponent content="Laster inn budsjett..." />

  return (
    <Container style={{ marginTop: '8rem', marginBottom: '8rem' }}>
      <Header as="h1">Mine Budsjett</Header>
      <Card.Group>
        {Array.from(budgetRegistry.values()).map(budget => (
          <Card key={budget.id}>
            <Card.Content>
              <Card.Header>{budget.name}</Card.Header>
              <Card.Meta>Total Net Income: {budget.totalNetIncome}</Card.Meta>
              <Card.Description>Total Expenses: {budget.totalExpense}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button as={Link} to={`/budget/${budget.id}`} content='Åpne' color='blue' />
                <Button
                  name={budget.id}
                  loading={loading && target === budget.id}
                  onClick={(e) => handleBudgetDelete(e, budget.id)}
                  content='Slett'
                  color='red'
                />
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
});
