//Expense.cs

namespace Domain
{
    public class Expense
    {
        public Guid Id { get; set; }
        public string Description { get; set; } // Beskrivelse av utgiften (f.eks. husleie, mat)
        public decimal Amount { get; set; } // Beløpet
    }
}
