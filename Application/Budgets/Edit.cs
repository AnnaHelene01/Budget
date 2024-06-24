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

        if (budget == null) return Result<Unit>.Failure("Budget not found");

        // Map only scalar properties (excluding incomes and expenses) manually
        budget.Name = request.Budget.Name;
        budget.TotalGrossIncome = request.Budget.TotalGrossIncome;
        budget.TotalNetIncome = request.Budget.TotalNetIncome;
        budget.TotalExpense = request.Budget.TotalExpense;
        // Map incomes and expenses using AutoMapper
        _mapper.Map(request.Budget.Incomes, budget.Incomes); // Make sure this is correctly configured in AutoMapper
        _mapper.Map(request.Budget.Expenses, budget.Expenses); // Make sure this is correctly configured in AutoMapper

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Failed to update budget");

        return Result<Unit>.Success(Unit.Value);
    }
}

    }
}