import { Button, Card, Container, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx"; // Importer toJS fra MobX
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function BudgetList() {
  const { budgetStore } = useStore();
  const { deleteBudget, loading, budgetRegistry, loadBudgets, loadingInitial } = budgetStore;

  useEffect(() => {
    if (budgetRegistry.size === 0) {
      loadBudgets().catch((error) => {
        console.error("Failed to load budgets", error);
      });
    }
  }, [budgetRegistry.size, loadBudgets]);

  const [target, setTarget] = useState('');

  function handleBudgetDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteBudget(id);
  }

  if (loadingInitial) return <LoadingComponent content="Laster inn budsjett..." />;

  console.log("Rendering BudgetList with budgets:", Array.from(budgetRegistry.values()).map(budget => ({
    ...budget,
    expenses: toJS(budget.expenses), // Bruk toJS på nødvendige egenskaper
    incomes: toJS(budget.incomes), // Bruk toJS på nødvendige egenskaper
    // Legg til andre egenskaper etter behov
  })));

  return (
    <Container style={{ marginTop: '8rem', marginBottom: '8rem' }}>
      <Header as="h1" style={{ marginTop: '5em', marginBottom: '2em' }}>Mine Budsjett</Header>
      <Card.Group itemsPerRow={2} stackable>
        {Array.from(budgetRegistry.values()).map(budget => {
          const remainingAmount = budget.totalNetIncome - budget.totalExpense;

          return (
            <Card key={budget.id} color='blue' fluid style={{ padding: '2em' }}>
              <Card.Content>
                <Card.Header>
                  <Icon name="money bill alternate" circular />
                  {budget.name}
                </Card.Header>
                <Card.Meta style={{ marginTop: '2em' }}>Netto inntekt: {budget.totalNetIncome}</Card.Meta>
                <Card.Description>Utgifter: {budget.totalExpense}</Card.Description>
                <Card.Description>Gjenværende beløp: {remainingAmount}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button as={Link} to={`/budget/${budget.id}`} icon='folder open' content='Åpne' color='blue' />
                  <Button
                    name={budget.id}
                    loading={loading && target === budget.id}
                    onClick={(e) => handleBudgetDelete(e, budget.id)}
                    icon='trash alternate'
                    content='Slett'
                    color='red'
                  />
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </Container>
  );
});
