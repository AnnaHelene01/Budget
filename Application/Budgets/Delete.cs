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
                var budget = await _context.Budgets.FindAsync(request.Id);
                if (budget == null) return null;
                _context.Remove(budget);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete the activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
