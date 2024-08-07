using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        var budget = await _context.Budgets
            .Include(b => b.Incomes)
            .Include(b => b.Expenses)
            .FirstOrDefaultAsync(b => b.Id == request.Budget.Id, cancellationToken);

        if (budget == null) return Result<Unit>.Failure("Budget not found");

        try
        {
            budget.Name = request.Budget.Name;
            budget.TotalGrossIncome = request.Budget.TotalGrossIncome;
            budget.TotalNetIncome = request.Budget.TotalNetIncome;
            budget.TotalExpense = request.Budget.TotalExpense;
            budget.NetAmount = request.Budget.NetAmount;

            // Update or add incomes
            foreach (var income in request.Budget.Incomes)
            {
                var existingIncome = budget.Incomes.FirstOrDefault(i => i.Id == income.Id);
                if (existingIncome != null)
                {
                    _mapper.Map(income, existingIncome);
                }
                else
                {
                    budget.Incomes.Add(income);
                }
            }

            // Remove incomes not in the request
            foreach (var existingIncome in budget.Incomes.ToList())
            {
                if (!request.Budget.Incomes.Any(i => i.Id == existingIncome.Id))
                {
                    _context.Incomes.Remove(existingIncome);
                }
            }

            // Update or add expenses
            foreach (var expense in request.Budget.Expenses)
            {
                var existingExpense = budget.Expenses.FirstOrDefault(e => e.Id == expense.Id);
                if (existingExpense != null)
                {
                    _mapper.Map(expense, existingExpense);
                }
                else
                {
                    budget.Expenses.Add(expense);
                }
            }

            // Remove expenses not in the request
            foreach (var existingExpense in budget.Expenses.ToList())
            {
                if (!request.Budget.Expenses.Any(e => e.Id == existingExpense.Id))
                {
                    _context.Expenses.Remove(existingExpense);
                }
            }

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("Failed to update budget");

            return Result<Unit>.Success(Unit.Value);
        }
        catch (Exception ex)
        {
            // Log exception details
            return Result<Unit>.Failure($"Exception: {ex.Message}");
        }
    }
}
}
    }
