
using Domain;
using MediatR;
using Persistence;

namespace Application.Budgets
{
    public class Details
    {
        public class Query : IRequest<Budget>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Budget>
        {
            private readonly BudgetContext _context;
            public Handler(BudgetContext context)
            {
                _context = context;
            }
            public async Task<Budget> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Budgets.FindAsync(request.Id);
            }
        }
    }
}