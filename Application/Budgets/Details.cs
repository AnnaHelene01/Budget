
using Application.Core;
using Domain;
using MediatR;
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
                var budget = await _context.Budgets.FindAsync(request.Id);
                
                return Result<Budget>.Success(budget);
            }
        }
    }
}