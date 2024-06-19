using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Budgets
{
    public class  Create
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
            public Handler(BudgetContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Budgets.Add(request.Budget);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create budgt");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}