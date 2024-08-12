using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class BudgetContext : IdentityDbContext<AppUser>
    {
        public BudgetContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expense> Expenses { get; set; }

    }
}
