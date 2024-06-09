using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Budgets;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BudgetController : BaseApiController
    {
        private readonly BudgetContext _context;

        public BudgetController(BudgetContext context)
        {
            _context = context;
        }

        [HttpGet] //api/budget
        public async Task<ActionResult<List<Budget>>> GetBudgets(CancellationToken ct)
        {
            var budgets = await _context.Budgets
                .Include(b => b.Incomes)
                .Include(b => b.Expenses)
                .ToListAsync(ct);

            return Ok(budgets);
        }

        [HttpGet("{id}")] //api/budget/{id}
        public async Task<ActionResult<Budget>> GetBudget(Guid id)
        {
            var budget = await _context.Budgets
                .Include(b => b.Incomes)
                .Include(b => b.Expenses)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (budget == null)
            {
                return NotFound();
            }

            return Ok(budget);
        }

        [HttpPost] //api/budget
        public async Task<IActionResult> CreateBudget(Budget budget)
        {
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Budget budget)
        {
            budget.Id = id;
            await Mediator.Send(new Edit.Command { Budget = budget });
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command{ Id = id });
            
            return Ok();
        }
    }
}
