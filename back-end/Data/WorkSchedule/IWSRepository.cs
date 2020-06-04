using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using back_end.DTOs.Employment;
using back_end.DTOs.WorkSchedule;
using Przychodnia.API;

namespace back_end.Data
{
    public interface IWSRepository : IGenericRepository
    {
        Task<Workschedule> GetUserWS(int userId);
        Task<Workschedule> GenerateUserWS(int userId, WorkScheduleNewDTO newWS, List<Day> vacList);
        Task<Workschedule> GenerateWS(IEnumerable<User> users, WorkScheduleNewDTO newWS);
        Task<Day> GetDayByNumber(int userId, int dayNumber);
        List<Day> VacationDaysToList(IEnumerable<Vacation> daylist);
        Task<Day> CheckIfDayExists(int userId, DateTime day);
        Task<Day> UpdateDay(int userId, DayUpdateDTO day);
    }
}