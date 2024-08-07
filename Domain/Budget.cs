using Domain;

public class Budget
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal TotalGrossIncome { get; set; }
    public decimal TotalNetIncome { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal NetAmount { get; set; }
    public List<Income> Incomes { get; set; }
    public List<Expense> Expenses { get; set; }
}
