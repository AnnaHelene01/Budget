using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Budgets
{
    public class  Create
    {
        public class Command : IRequest
        {
            public Budget Budget { get; set; }
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
                _context.Budgets.Add(request.Budget);
                await _context.SaveChangesAsync();
            }
        }
    }
}