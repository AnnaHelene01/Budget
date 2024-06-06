using Domain;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class BudgetRepository : IBudgetRepository
    {
        private readonly BudgetContext _context;

        public BudgetRepository(BudgetContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Budget>> GetAllAsync()
        {
            return await _context.Budgets.Include(b => b.Incomes).Include(b => b.Expenses).ToListAsync();
        }

        public async Task<Budget> GetByIdAsync(Guid id)
        {
            return await _context.Budgets.Include(b => b.Incomes).Include(b => b.Expenses).FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task AddAsync(Budget budget)
        {
            await _context.Budgets.AddAsync(budget);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Budget budget)
        {
            _context.Budgets.Update(budget);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget != null)
            {
                _context.Budgets.Remove(budget);
                await _context.SaveChangesAsync();
            }
        }
    }
}
