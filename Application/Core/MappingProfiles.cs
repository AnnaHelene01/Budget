using AutoMapper;
using Domain;

namespace Application.Core
{
public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Budget, Budget>(); // Map Budget til seg selv
        CreateMap<Income, Income>(); // Map Income til seg selv
        CreateMap<Expense, Expense>(); // Map Expense til seg selv
    }
}

}
