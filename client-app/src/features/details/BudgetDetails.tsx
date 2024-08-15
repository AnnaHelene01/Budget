import { Button, Container, Header, Icon, Segment, Table } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
//import { toJS } from "mobx"; // Importer toJS fra MobX

export default observer(function BudgetDetails() {
    const { budgetStore } = useStore();
    const { selectedBudget: budget, loadBudget, loadingInitial } = budgetStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadBudget(id);
    }, [id, loadBudget]);

    if (loadingInitial || !budget) return <LoadingComponent content="Laster budsjett..." />;

    const remainingAmount = budget.totalNetIncome - budget.totalExpense;

    //console.log("Rendering BudgetDetails with budget:", toJS(budget)); // Konsollogger budsjettet før rendering
    console.log(budget);
    

    return (
        <>
            <Container style={{ marginTop: '8rem' }}>
                <Header as="h1" style={{ marginTop: '5em', marginBottom: '2em' }}>{budget.name}</Header>
                <Segment>
                    <Header as="h2">
                        <Icon name="money bill alternate" />
                        <Header.Content>ØkonomiPilot Oversikt</Header.Content>
                    </Header>
                    <Table celled>
                        <Table.Body>
                        <Table.Row>
                                <Table.Cell>Totalt Brutto Inntekter</Table.Cell>
                                <Table.Cell>{budget.totalGrossIncome}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Totalt Netto Inntekter</Table.Cell>
                                <Table.Cell>{budget.totalNetIncome}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Totalt Utgifter</Table.Cell>
                                <Table.Cell>{budget.totalExpense}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Gjenværende beløp</Table.Cell>
                                <Table.Cell>{remainingAmount}</Table.Cell>
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
                            {budget.incomes ? budget.incomes.map(income => (
                                <Table.Row key={income.id}>
                                    <Table.Cell>{income.source}</Table.Cell>
                                    <Table.Cell>{income.grossAmount}</Table.Cell>
                                    <Table.Cell>{income.netAmount}</Table.Cell>
                                    <Table.Cell>{income.taxPercentage}%</Table.Cell>
                                </Table.Row>
                            )) : <Table.Row><Table.Cell colSpan="4">Ingen inntekter</Table.Cell></Table.Row>}
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
                            {budget.expenses ? budget.expenses.map(expense => (
                                <Table.Row key={expense.id}>
                                    <Table.Cell>{expense.category}</Table.Cell>
                                    <Table.Cell>{expense.subcategory}</Table.Cell>
                                    <Table.Cell>{expense.description}</Table.Cell>
                                    <Table.Cell>{expense.amount}</Table.Cell>
                                </Table.Row>
                            )) : <Table.Row><Table.Cell colSpan="4">Ingen utgifter</Table.Cell></Table.Row>}
                        </Table.Body>
                    </Table>
                </Segment>

                <Segment>
                    <Button primary as={Link} to={`/manage/${budget.id}`}>
                        <Icon name="edit" /> Rediger
                    </Button>
                    <Button as={Link} to="/budget">
                        <Icon name="arrow left" /> Tilbake
                    </Button>
                </Segment>
            </Container>
        </>
    );
});
