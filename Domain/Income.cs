//Income.cs

namespace Domain
{
    public class Income
    {
        public Guid Id { get; set; }
        public string Source { get; set; } // Kilde til inntekten (f.eks. lønn, sidejobb)
        public decimal GrossAmount { get; set; } // Brutto beløpet
        public decimal TaxPercentage { get; set; } // Skatteprosent
        public decimal NetAmount { get; set; } // Netto beløp
    }
}