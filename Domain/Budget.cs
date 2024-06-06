//Budget.cs

namespace Domain
{
    public class Budget
    {
        public Guid Id { get; set; }
        public string Name { get; set; } // Navn eller beskrivelse av budsjettet
        public decimal TotalGrossIncome => Incomes.Sum(income => income.GrossAmount); // Total brutto inntekt
        public decimal TotalNetIncome => Incomes.Sum(income => income.NetAmount); // Total netto inntekt
        public decimal TotalExpense => Expenses.Sum(expense => expense.Amount); // Total utgift
        public decimal NetAmount => TotalNetIncome - TotalExpense; // Netto beløp (automatisk beregnet)

        // List over individuelle inntekts- og utgiftsposter
        public List<Income> Incomes { get; set; } = new();
        public List<Expense> Expenses { get; set; } = new();
    }
}
