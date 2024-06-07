using Application.Budgets;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class BudgetController : BaseApiController
    {

        [HttpGet] //api/budget
        public async Task<ActionResult<List<Budget>>> GetBudgets()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/budget/fedkek
        public async Task<ActionResult<Budget>> GetBudget(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost] //api/budget
        public async Task<IActionResult> CreateBudget(Budget budget)
        {
            await Mediator.Send(new Create.Command {Budget = budget});
            return Ok();
        }
    }
}
