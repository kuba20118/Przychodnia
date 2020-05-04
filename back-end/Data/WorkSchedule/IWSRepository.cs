using System.Collections.Generic;
using System.Threading.Tasks;
using back_end.DTOs.Employment;
using Przychodnia.API;

namespace back_end.Data
{
    public interface IWSRepository : IGenericRepository
    {
        Task<Workschedule> GetUserWS(int userId);
        Task<IEnumerable<Workschedule>> GetWorkSchedules();
        Task<Workschedule> GenerateUserWS(int userId, WorkScheduleNewDTO newWS, List<Day> vacList);
        Task<Workschedule> GenerateWS(IEnumerable<User> users, WorkScheduleNewDTO newWS);

        Task<Day> GetDayByNumber(int userId, int dayNumber);
        List<Day> VacationDaysToList(IEnumerable<Vacation> daylist);
    }
}