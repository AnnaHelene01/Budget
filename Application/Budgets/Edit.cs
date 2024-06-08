using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Budgets
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Budget Budget { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly BudgetContext _context;
            private readonly IMapper _mapper;
            public Handler(BudgetContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var budget = await _context.Budgets.FindAsync(request.Budget.Id);
                
                _mapper.Map(request.Budget, budget);

                await _context.SaveChangesAsync();
            }
        }
    }
}