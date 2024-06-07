//Budget.cs

namespace Domain
{
    public class Budget
    {
        public Guid Id { get; set; }
        public string Name { get; set; } // Navn eller beskrivelse av budsjettet
        public decimal TotalGrossIncome { get; set; } // Total brutto inntekt
        public decimal TotalNetIncome { get; set; } // Total netto inntekt
        public decimal TotalExpense { get; set; } // Total utgift
        public decimal NetAmount { get; set; } // Netto beløp (automatisk beregnet)

        // List over individuelle inntekts- og utgiftsposter
        public List<Income> Incomes { get; set; }
        public List<Expense> Expenses { get; set; }
    }
}
