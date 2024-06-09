using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Budgets
{
    public class List
    {
        public class Query : IRequest<List<Budget>> {}

        public class Handler : IRequestHandler<Query, List<Budget>>
        {
            private readonly BudgetContext _context;
            public Handler(BudgetContext context)
            {
                _context = context;
            }
            public async Task<List<Budget>> Handle(Query request, CancellationToken token)
            {
                return await _context.Budgets.ToListAsync();
            }
        }
    }
}