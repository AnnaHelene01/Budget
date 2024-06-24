using Application.Budgets;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class BudgetController : BaseApiController
    {
        [HttpGet] //api/budget
        public async Task<IActionResult> GetBudgets(CancellationToken ct)
        {
            return HandleResult(await Mediator.Send(new List.Query(), ct));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBudget(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> CreateBudget([FromBody] Budget budget)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Budget = budget }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Budget budget)
        {
            budget.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Budget = budget }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command{ Id = id });
            
            return Ok();
        }
    }
}
