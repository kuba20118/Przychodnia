using AutoMapper;
using back_end.DTOs;
using back_end.DTOs.Employment;
using back_end.DTOs.Vacation;
using Przychodnia.API;

namespace back_end.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserReturnDTO>()
                .ForMember(dest => dest.WorkingHours, opt =>
                    opt.MapFrom(src => src.IdEmplNavigation.WorkingHours)
                    )
                .ForMember(dest => dest.HireDate, opt =>
                    opt.MapFrom(src => src.IdEmplNavigation.HireDate)
                    )
                .ForMember(dest => dest.FireDate, opt =>
                    opt.MapFrom(src => src.IdEmplNavigation.FireDate)
                    )
                .ForMember(dest => dest.CurrentyEmployed, opt =>
                    opt.MapFrom(src => src.IdEmplNavigation.CurrentyEmployed)
                    )
                .ForMember(dest => dest.Role, opt =>
                    opt.MapFrom(src => src.IdRoleNavigation.Name)
                    );

            CreateMap<UserUpdateDTO, User>();

            CreateMap<Vacation, VacationDTO>()
                .ForMember(dest => dest.AbsenceType, opt =>
                    opt.MapFrom(src => src.IdAbsenceVacNavigation.Name)
                    )
                .ForMember(dest => dest.IdUser, opt =>
                    opt.MapFrom(src => src.IdUserVacNavigation.IdUser)
                    );

            CreateMap<Leftvacationdays, LeftVacationDaysDTO>()
            .ForMember(dest => dest.VacationType, opt =>
                    opt.MapFrom(src => src.IdAbsenceNavigation.Name)
                    )
                .ForMember(dest => dest.UserId, opt =>
                    opt.MapFrom(src => src.IdUserNavigation.IdUser)
                    );
            CreateMap<EmplUpdateDTO, Employment>();

            CreateMap<DayDTO, Day>();
            CreateMap<DayNewDTO, Day>();
            CreateMap<Day, DayDTO>();
            CreateMap<Day, DayNewDTO>();
            // .ForMember(dest => dest.DayOfYear, opt =>
            //         opt.MapFrom(src => src.FromTime.DayOfYear)
            // );

            CreateMap<WorkScheduleNewDTO, Workschedule>();
            CreateMap<Workschedule, WorkScheduleNewDTO>();

            CreateMap<Workschedule, WorkScheduleReturn>()
            .ForMember(dest => dest.Day, opt =>
                    opt.MapFrom(src => src.Day)
                    );

            CreateMap<Absence, AbsenceDTO>();
        }
    }
}