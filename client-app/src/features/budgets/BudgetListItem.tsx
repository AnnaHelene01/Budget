import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Budget } from '../../app/models/budget';
import { Button, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  budget: Budget;
}

const BudgetListItem: React.FC<Props> = ({ budget }) => {
  const { budgetStore } = useStore();
  const { deleteBudget, loading, loadingInitial } = budgetStore;
  const [target, setTarget] = useState('');

  useEffect(() => {
    if (loading) {
      console.log('Deleting budget...');
    }
  }, [loading]);

  const handleBudgetDelete = async (id: string) => {
    try {
      await deleteBudget(id); // Kall deleteBudget fra MobX store
      toast.success('Budget deleted successfully'); // Varsel om vellykket sletting
    } catch (error) {
      console.error('Error deleting budget', error); // Logg feil
      toast.error('Failed to delete budget'); // Varsel om feil sletting
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading..." />;

  const remainingAmount = budget.totalNetIncome - budget.totalExpense;

  return (
    <Card fluid style={{ padding: '2em' }}>
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
            onClick={() => handleBudgetDelete(budget.id)}
            icon='trash alternate'
            content='Slett'
            color='red'
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default observer(BudgetListItem);
