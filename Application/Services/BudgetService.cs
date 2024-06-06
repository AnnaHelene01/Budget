using Application.Interfaces;
using Domain;
using Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class BudgetService : IBudgetService
    {
        private readonly IBudgetRepository _budgetRepository;

        public BudgetService(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }

        public async Task<IEnumerable<Budget>> GetAllBudgetsAsync()
        {
            return await _budgetRepository.GetAllAsync();
        }

        public async Task<Budget> GetBudgetByIdAsync(Guid id)
        {
            return await _budgetRepository.GetByIdAsync(id);
        }

        public async Task AddBudgetAsync(Budget budget)
        {
            await _budgetRepository.AddAsync(budget);
        }

        public async Task UpdateBudgetAsync(Budget budget)
        {
            await _budgetRepository.UpdateAsync(budget);
        }

        public async Task DeleteBudgetAsync(Guid id)
        {
            await _budgetRepository.DeleteAsync(id);
        }
    }
}
