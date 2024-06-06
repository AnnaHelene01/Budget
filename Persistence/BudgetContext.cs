using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class BudgetContext : DbContext
    {
        public BudgetContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expense> Expenses { get; set; }

    }
}
