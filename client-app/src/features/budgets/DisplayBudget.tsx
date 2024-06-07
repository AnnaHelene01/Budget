import axios from "axios";
import { useEffect, useState } from "react"
import { Container } from "semantic-ui-react";

function DisplayBudget() {

    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/budget')
            .then(response => {
                setBudgets(response.data)
                console.log(response.data);
            })            
    }, [])

    return (
        <>
        <Container style={{ marginTop: '8rem' }}>
            <h1>Mine Budsjetter</h1>
            <ul>
                {budgets.map((budget: any) => (
                    <h3 key={budget.id}>
                        - {budget.name}
                    </h3>
                ))}
            </ul>
        </Container>
        </>
    )
}

export default DisplayBudget