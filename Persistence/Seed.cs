using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(BudgetContext context)
        {
            if (context.Budgets.Any()) return;
            {
                var budget1 = new Budget
                {
                    Id = Guid.NewGuid(),
                    Name = "Månedlig budsjett",
                    Incomes = new List<Income>
                    {
                        new Income
                        {
                            Id = Guid.NewGuid(),
                            Source = "Lønn",
                            GrossAmount = 41666,
                            TaxPercentage = 30
                        }
                    },
                    Expenses = new List<Expense>
                    {
                        new Expense
                        {
                            Id = Guid.NewGuid(),
                            Description = "Husleie",
                            Amount = 7725
                        }
                    }
                };

                var budget2 = new Budget
                {
                    Id = Guid.NewGuid(),
                    Name = "Årlig budsjett",
                    Incomes = new List<Income>
                    {
                        new Income
                        {
                            Id = Guid.NewGuid(),
                            Source = "Bonus",
                            GrossAmount = 10000,
                            TaxPercentage = 25
                        }
                    },
                    Expenses = new List<Expense>
                    {
                        new Expense
                        {
                            Id = Guid.NewGuid(),
                            Description = "Bilforsikring",
                            Amount = 5000
                        }
                    }
                };

                await context.Budgets.AddRangeAsync(budget1, budget2);
                await context.SaveChangesAsync();
            }
        }
    }
}
