import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";
import axios, { AxiosResponse } from "axios";

interface Budget {
    id: string;
    name: string;
    totalNetIncome: number;
    totalExpense: number;
}

function DisplayBudget() {
    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/budget')
            .then((response: AxiosResponse<Budget[]>) => {
                setBudgets(response.data);
                console.log(response.data);
            })            
            .catch((error) => {
                console.error('Error fetching budgets:', error);
            });
    }, []);

    return (
        <Container style={{ marginTop: '8rem' }}>
            <h1>Mine Budsjetter</h1>
            <Card.Group>
                {budgets.map((budget: Budget) => (
                    <Card
                        as={Link}
                        to={`/budget/${budget.id}`}
                        key={budget.id}
                        header={budget.name}
                        meta={`Total Net Income: ${budget.totalNetIncome}`}
                        description={`Total Expenses: ${budget.totalExpense}`}
                    />
                ))}
            </Card.Group>
        </Container>
    );
}

export default DisplayBudget;
