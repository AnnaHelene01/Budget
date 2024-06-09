import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Container, Header, Segment, Table, Icon, Button, } from "semantic-ui-react";

interface Budget {
    id: string;
    name: string;
    totalNetIncome: number;
    totalExpense: number;
    incomes: { id: string, source: string, grossAmount: number, netAmount: number, taxPercentage: number }[];
    expenses: { id: string, category: string, subcategory: string, description: string, amount: number }[];
}

function BudgetDetails() {
    const { id } = useParams<{ id: string }>();
    const [budget, setBudget] = useState<Budget | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/budget/${id}`)
            .then((response: AxiosResponse<Budget>) => {
                setBudget(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching budget details:', error);
            });
    }, [id]);

    if (!budget) {
        return <div>Loading...</div>;
    }

    return (
        <Container style={{ marginTop: '8rem' }}>
            <Header as="h1">{budget.name}</Header>
            
            <Segment>
                <Header as="h2">
                    <Icon name="money bill alternate" />
                    <Header.Content>ØkonomiPilot Oversikt</Header.Content>
                </Header>
                <Table celled>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Totalt Netto Inntekter</Table.Cell>
                            <Table.Cell>{budget.totalNetIncome}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Totalt Utgifter</Table.Cell>
                            <Table.Cell>{budget.totalExpense}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Segment>

            <Segment>
                <Header as="h2">
                    <Icon name="arrow up" />
                    <Header.Content>Inntekter</Header.Content>
                </Header>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Kilde</Table.HeaderCell>
                            <Table.HeaderCell>Brutto beløp i måneden</Table.HeaderCell>
                            <Table.HeaderCell>Netto beløp i måneden</Table.HeaderCell>
                            <Table.HeaderCell>Skattetrekk i prosent</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {budget.incomes.map(income => (
                            <Table.Row key={income.id}>
                                <Table.Cell>{income.source}</Table.Cell>
                                <Table.Cell>{income.grossAmount}</Table.Cell>
                                <Table.Cell>{income.netAmount}</Table.Cell>
                                <Table.Cell>{income.taxPercentage}%</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>

            <Segment>
                <Header as="h2">
                    <Icon name="arrow down" />
                    <Header.Content>Utgifter</Header.Content>
                </Header>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Kategori</Table.HeaderCell>
                            <Table.HeaderCell>Underkategori</Table.HeaderCell>
                            <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
                            <Table.HeaderCell>Beløp</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {budget.expenses.map(expense => (
                            <Table.Row key={expense.id}>
                                <Table.Cell>{expense.category}</Table.Cell>
                                <Table.Cell>{expense.subcategory}</Table.Cell>
                                <Table.Cell>{expense.description}</Table.Cell>
                                <Table.Cell>{expense.amount}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>

            <Segment>
                <Button primary>
                    <Icon name="edit" /> Rediger
                </Button>
                <Button negative>
                    <Icon name="trash" /> Slett
                </Button>
            </Segment>
        </Container>
    );
}

export default BudgetDetails;
