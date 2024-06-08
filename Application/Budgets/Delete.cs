using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Budgets
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly BudgetContext _context;

            public Handler(BudgetContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var budget = await _context.Budgets
                    .Include(b => b.Incomes)
                    .Include(b => b.Expenses)
                    .FirstOrDefaultAsync(b => b.Id == request.Id);

                if (budget == null)
                {
                    throw new Exception("Budget not found");
                }

                // Slett tilknyttede inntekter og utgifter
                _context.Incomes.RemoveRange(budget.Incomes);
                _context.Expenses.RemoveRange(budget.Expenses);

                // Slett budsjettet
                _context.Budgets.Remove(budget);

                await _context.SaveChangesAsync();

            }
        }
    }
}
