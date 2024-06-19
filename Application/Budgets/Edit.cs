using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Budgets
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Budget Budget { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Budget).SetValidator(new BudgetValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly BudgetContext _context;
            private readonly IMapper _mapper;
            public Handler(BudgetContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var budget = await _context.Budgets.FindAsync(request.Budget.Id);

                if (budget == null) return null;
                
                _mapper.Map(request.Budget, budget);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update budget");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}