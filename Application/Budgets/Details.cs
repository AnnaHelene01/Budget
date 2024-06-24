using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Budgets
{
    public class Details
    {
        public class Query : IRequest<Result<Budget>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Budget>>
        {
            private readonly BudgetContext _context;
            public Handler(BudgetContext context)
            {
                _context = context;
            }
            public async Task<Result<Budget>> Handle(Query request, CancellationToken cancellationToken)
            {
                var budget = await _context.Budgets
                    .Include(b => b.Incomes) // Inkluder inntekter
                    .Include(b => b.Expenses) // Inkluder utgifter
                    .FirstOrDefaultAsync(b => b.Id == request.Id); // Bruk FirstOrDefaultAsync for å få budsjettet
                
                if (budget == null) return Result<Budget>.Failure("Budget not found");

                return Result<Budget>.Success(budget);
            }
        }
    }
}
