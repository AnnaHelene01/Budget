export interface Budget {
    id: string;
    name: string;
    totalNetIncome: number;
    totalExpense: number;
    totalGrossIncome: number;
    netAmount: number;
    incomes: Income[];
    expenses: Expense[];
}

export interface Income {
    id: string;
    source: string;
    grossAmount: number;
    netAmount: number;
    taxPercentage: number;
}

export interface Expense {
    id: string;
    category: string;
    subcategory: string;
    description: string;
    amount: number;
}