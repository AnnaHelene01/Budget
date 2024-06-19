using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Budgets
{
    public class List
    {
        public class Query : IRequest<Result<List<Budget>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Budget>>>
        {
            private readonly BudgetContext _context;
            public Handler(BudgetContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Budget>>> Handle(Query request, CancellationToken token)
            {
                return Result<List<Budget>>.Success(await _context.Budgets.ToListAsync());
            }
        }
    }
}