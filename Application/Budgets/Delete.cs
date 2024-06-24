using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Budgets
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly BudgetContext _context;

            public Handler(BudgetContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Finn budsjettet inkludert alle inntekter og utgifter
                var budget = await _context.Budgets
                    .Include(b => b.Incomes)
                    .Include(b => b.Expenses)
                    .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);

                if (budget == null)
                {
                    return Result<Unit>.Failure("Budget not found");
                }

                // Slett tilknyttede inntekter og utgifter
                _context.Incomes.RemoveRange(budget.Incomes);
                _context.Expenses.RemoveRange(budget.Expenses);
                
                // Slett budsjettet
                _context.Budgets.Remove(budget);

                var result = await _context.SaveChangesAsync(cancellationToken);

                if (result > 0)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
                else
                {
                    return Result<Unit>.Failure("Failed to delete the budget");
                }
            }
        }
    }
}
