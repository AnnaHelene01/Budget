using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Budget, Budget>()
                .ForMember(dest => dest.Incomes, opt => opt.MapFrom(src => src.Incomes)) // Kartlegg Incomes fra src til dest
                .ForMember(dest => dest.Expenses, opt => opt.MapFrom(src => src.Expenses)); // Kartlegg Expenses fra src til dest
        }
    }
}
