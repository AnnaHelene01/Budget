using Domain;
using FluentValidation;

namespace Application.Budgets
{
    public class BudgetValidator : AbstractValidator<Budget>
    {
        public BudgetValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Incomes).NotEmpty();
            RuleFor(x => x.Expenses).NotEmpty();
        }
    }
}