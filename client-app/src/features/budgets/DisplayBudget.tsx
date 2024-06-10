// DisplayBudget.tsx
import { Card, Button } from "semantic-ui-react";
import { Budget } from "../../app/models/budget";
import { Link } from "react-router-dom";

interface Props {
   budgets: Budget[];
   selectBudget: (id: string) => void;
   deleteBudget: (id: string) => void;
}

function DisplayBudget({ budgets, selectBudget, deleteBudget }: Props) {

    return (
        <Card.Group>
            {budgets.map((budget: Budget) => (
                <Card key={budget.id}>
                    <Card.Content>
                        <Card.Header>{budget.name}</Card.Header>
                        <Card.Meta>Total Net Income: {budget.totalNetIncome}</Card.Meta>
                        <Card.Description>Total Expenses: {budget.totalExpense}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button basic color='blue' onClick={() => { selectBudget(budget.id); }}>
                            <Link to={`/budget/${budget.id}`}>
                                Åpne
                            </Link>
                        </Button>

                        <Button onClick={() => deleteBudget(budget.id)} basic color='red'>Slett</Button>
                        </div>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );
}

export default DisplayBudget;
