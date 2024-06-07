using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers
{
    public class BudgetController : BaseApiController
    {
        private readonly BudgetContext _context;
        private readonly ILogger<BudgetController> _logger;

        public BudgetController(BudgetContext context, ILogger<BudgetController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet] //api/budgets
        public async Task<ActionResult<List<Budget>>> GetBudgets()
        {
            _logger.LogInformation("GetBudgets called");
            try
            {
                var budgets = await _context.Budgets
                    .Include(b => b.Incomes)
                    .Include(b => b.Expenses)
                    .ToListAsync();
                _logger.LogInformation("Budgets retrieved successfully");
                return Ok(budgets);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving budgets");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")] //api/budgets/fedkek
        public async Task<ActionResult<Budget>> GetBudget(Guid id)
        {
            _logger.LogInformation("GetBudget called with id: {Id}", id);
            try
            {
                var budget = await _context.Budgets
                    .Include(b => b.Incomes)
                    .Include(b => b.Expenses)
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (budget == null)
                {
                    _logger.LogWarning("Budget with id {Id} not found", id);
                    return NotFound();
                }

                _logger.LogInformation("Budget retrieved successfully");
                return Ok(budget);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving budget with id: {Id}", id);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
