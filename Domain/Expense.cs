namespace Domain
{
    public class Expense
    {
        public Guid Id { get; set; }
        public string Category { get; set; } // Kategori av utgiften
        public string Subcategory { get; set; } // Underkategori av utgiften
        public string Description { get; set; } // Beskrivelse av utgiften
        public decimal Amount { get; set; } // Beløpet
    }
}
