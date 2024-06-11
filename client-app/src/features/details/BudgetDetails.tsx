import { Button, Container, Header, Icon, Segment, Table } from "semantic-ui-react";
import { Budget } from "../../app/models/budget"

interface Props {
    budget: Budget
    cancelSelectBudget: () => void;
}

export default function BudgetDetails ({ budget, cancelSelectBudget }:Props) {

    return (
    <>
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
                <Button primary >
                    <Icon name="edit" /> Rediger
                </Button>
                <Button negative onClick={cancelSelectBudget}>
                    <Icon name="trash" /> Slett
                </Button>
            </Segment>
        </Container>
    </>
    );
}

