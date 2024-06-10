import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Container, Form, Button, Header, Segment, Icon, Dropdown } from "semantic-ui-react";
import { categoryOptions, updateSubcategoryOptions } from '../form/CategoryOptions';  // Importer kategoridataene

interface Income {
    id: string;
    source: string;
    grossAmount: number;
    netAmount: number;
    taxPercentage: number;
}

interface Expense {
    id: string;
    category: string;
    subcategory: string;
    description: string;
    amount: number;
}

interface Budget {
    id: string;
    name: string;
    totalNetIncome: number;
    totalExpense: number;
    incomes: Income[];
    expenses: Expense[];
}

function EditBudget() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [budget, setBudget] = useState<Budget | null>(null);
    const [subcategoryOptions, setSubcategoryOptions] = useState<{ [key: number]: any[] }>({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/budget/${id}`)
            .then((response: AxiosResponse<Budget>) => {
                setBudget(response.data);
                const initialSubcategoryOptions: { [key: number]: any[] } = {};
                response.data.expenses.forEach((expense, index) => {
                    initialSubcategoryOptions[index] = updateSubcategoryOptions(expense.category);
                });
                setSubcategoryOptions(initialSubcategoryOptions);
            })
            .catch((error) => {
                console.error('Error fetching budget details:', error);
            });
    }, [id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (budget) {
            setBudget({ ...budget, [name]: value });
        }
    };

    const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        if (budget) {
            const newIncomes = [...budget.incomes];
            newIncomes[index] = { ...newIncomes[index], [name]: value };
            setBudget({ ...budget, incomes: newIncomes });
        }
    };

    const handleExpenseChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        if (budget) {
            const newExpenses = [...budget.expenses];
            newExpenses[index] = { ...newExpenses[index], [name]: value };
            setBudget({ ...budget, expenses: newExpenses });
        }
    };

    const handleCategoryChange = (_event: React.SyntheticEvent<HTMLElement>, data: any, index: number) => {
        if (budget) {
            const newExpenses = [...budget.expenses];
            newExpenses[index] = { ...newExpenses[index], category: data.value, subcategory: '' };
            setBudget({ ...budget, expenses: newExpenses });

            const newSubcategoryOptions = { ...subcategoryOptions, [index]: updateSubcategoryOptions(data.value) };
            setSubcategoryOptions(newSubcategoryOptions);
        }
    };

    const handleSubcategoryChange = (_event: React.SyntheticEvent<HTMLElement>, data: any, index: number) => {
        if (budget) {
            const newExpenses = [...budget.expenses];
            newExpenses[index] = { ...newExpenses[index], subcategory: data.value };
            setBudget({ ...budget, expenses: newExpenses });
        }
    };

    const handleAddIncome = () => {
        if (budget) {
            const newIncome = { id: '', source: '', grossAmount: 0, netAmount: 0, taxPercentage: 0 };
            setBudget({ ...budget, incomes: [...budget.incomes, newIncome] });
        }
    };

    const handleRemoveIncome = (index: number) => {
        if (budget) {
            const newIncomes = budget.incomes.filter((_, i) => i !== index);
            setBudget({ ...budget, incomes: newIncomes });
        }
    };

    const handleAddExpense = () => {
        if (budget) {
            const newExpense = { id: '', category: '', subcategory: '', description: '', amount: 0 };
            setBudget({ ...budget, expenses: [...budget.expenses, newExpense] });
        }
    };

    const handleRemoveExpense = (index: number) => {
        if (budget) {
            const newExpenses = budget.expenses.filter((_, i) => i !== index);
            setBudget({ ...budget, expenses: newExpenses });

            const newSubcategoryOptions = { ...subcategoryOptions };
            delete newSubcategoryOptions[index];
            setSubcategoryOptions(newSubcategoryOptions);
        }
    };

    const handleSubmit = () => {
        if (budget) {
            axios.put(`http://localhost:5000/api/budget/${id}`, budget)
                .then(() => {
                    navigate(`/budget/${id}`);
                })
                .catch((error) => {
                    console.error('Error updating budget:', error);
                });
        }
    };

    if (!budget) {
        return <div>Loading...</div>;
    }

    return (
        <Container style={{ marginTop: '8rem' }}>
            <Header as="h1">
                <Icon name="money bill alternate" />
                <Header.Content>Rediger {budget.name} </Header.Content>
            </Header>
            <Segment>
                <Form>
                    <Form.Input
                        label="Navn"
                        name="name"
                        value={budget.name}
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        label="Totalt Netto Inntekter"
                        name="totalNetIncome"
                        value={budget.totalNetIncome}
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        label="Totalt Utgifter"
                        name="totalExpense"
                        value={budget.totalExpense}
                        onChange={handleInputChange}
                    />
                </Form>
            </Segment>
            <Segment>
                <Form>
                    <Header as="h3">
                        <Icon name="arrow up" />
                        <Header.Content>Inntekter</Header.Content>
                    </Header>
                    {budget.incomes.map((income, index) => (
                        <Segment key={index}>
                            <Form.Input
                                label="Kilde"
                                name="source"
                                value={income.source}
                                onChange={(e) => handleIncomeChange(e, index)}
                            />
                            <Form.Input
                                label="Brutto beløp i måneden"
                                name="grossAmount"
                                value={income.grossAmount}
                                onChange={(e) => handleIncomeChange(e, index)}
                            />
                            <Form.Input
                                label="Netto beløp i måneden"
                                name="netAmount"
                                value={income.netAmount}
                                onChange={(e) => handleIncomeChange(e, index)}
                            />
                            <Form.Input
                                label="Skattetrekk i prosent"
                                name="taxPercentage"
                                value={income.taxPercentage}
                                onChange={(e) => handleIncomeChange(e, index)}
                            />
                            <Button type="button" onClick={() => handleRemoveIncome(index)}>Fjern Inntekt</Button>
                        </Segment>
                    ))}
                    <Button type="button" onClick={handleAddIncome}>Legg til Inntekt</Button>
                </Form>
            </Segment>
            <Segment>
                <Form>
                    <Header as="h3">
                        <Icon name="arrow down" />
                        <Header.Content>Utgifter</Header.Content>
                    </Header>
                    {budget.expenses.map((expense, index) => (
                        <Segment key={index}>
                            <Form.Field>
                                <label>Kategori</label>
                                <Dropdown
                                    placeholder="Velg kategori"
                                    fluid
                                    selection
                                    options={categoryOptions}
                                    name="category"
                                    value={expense.category}
                                    onChange={(e, data) => handleCategoryChange(e, data, index)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Underkategori</label>
                                <Dropdown
                                    placeholder="Velg underkategori"
                                    fluid
                                    selection
                                    options={subcategoryOptions[index] || []}
                                    name="subcategory"
                                    value={expense.subcategory}
                                    onChange={(e, data) => handleSubcategoryChange(e, data, index)}
                                />
                            </Form.Field>
                            <Form.Input
                                label="Beskrivelse"
                                name="description"
                                value={expense.description}
                                onChange={(e) => handleExpenseChange(e, index)}
                            />
                            <Form.Input
                                label="Beløp"
                                name="amount"
                                value={expense.amount}
                                onChange={(e) => handleExpenseChange(e, index)}
                            />
                            <Button type="button" onClick={() => handleRemoveExpense(index)}>Fjern Utgift</Button>
                        </Segment>
                    ))}
                    <Button type="button" onClick={handleAddExpense}>Legg til Utgift</Button>
                </Form>
            </Segment>
            <Button primary onClick={handleSubmit}>Lagre</Button>
            <Button secondary onClick={() => navigate(`/budget/${id}`)}>Avbryt</Button>
        </Container>
    );
}

export default EditBudget;
