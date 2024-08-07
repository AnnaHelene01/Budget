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
                // Update basic budget details
                budget.Name = request.Budget.Name;
                budget.TotalGrossIncome = request.Budget.TotalGrossIncome;
                budget.TotalNetIncome = request.Budget.TotalNetIncome;
                budget.TotalExpense = request.Budget.TotalExpense;
                budget.NetAmount = request.Budget.NetAmount;

                // Handle incomes
                var incomingIncomeIds = request.Budget.Incomes.Select(i => i.Id).ToList();
                var existingIncomes = budget.Incomes.ToList();

                // Update or add new incomes
                foreach (var income in request.Budget.Incomes)
                {
                    var existingIncome = existingIncomes.FirstOrDefault(i => i.Id == income.Id);
                    if (existingIncome != null)
                    {
                        _mapper.Map(income, existingIncome); //Update existing income
                    }
                    else
                    {
                        budget.Incomes.Add(income); //Add new income
                    }
                }

                // Remove incomes not in the request
                foreach (var existingIncome in existingIncomes.Where(i => !incomingIncomeIds.Contains(i.Id)).ToList())
                {
                    _context.Incomes.Remove(existingIncome);
                }

                // Handle expenses
                var incomingExpenseIds = request.Budget.Expenses.Select(e => e.Id).ToList();
                var existingExpenses = budget.Expenses.ToList();

                // Update or add new expenses
                foreach (var expense in request.Budget.Expenses)
                {
                    var existingExpense = existingExpenses.FirstOrDefault(e => e.Id == expense.Id);
                    if (existingExpense != null)
                    {
                        _mapper.Map(expense, existingExpense); //Update existing expense
                    }
                    else
                    {
                        budget.Expenses.Add(expense); //Add new expense
                    }
                }

                // Remove expenses not in the request
                foreach (var existingExpense in existingExpenses.Where(e => !incomingExpenseIds.Contains(e.Id)).ToList())
                {
                    _context.Expenses.Remove(existingExpense);
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
