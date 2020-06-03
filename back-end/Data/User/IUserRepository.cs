using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using back_end.DTOs;
using back_end.DTOs.Vacation;
using Przychodnia.API;

namespace back_end.Data
{
    public interface IUserRepository : IGenericRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);

        Task<Employment> GetUserEmployment(int userId);
        Task<Vacationrequest> AddNewVacationRequest(int userId, NewVacationRequestDTO request);
        Task<IEnumerable<Vacation>> GetAllVacations();
        Task<IEnumerable<Vacationrequest>> GetUserRequests(int userId);
        Task<IEnumerable<Vacation>> GetVacations(int userId);
        Task<IEnumerable<Leftvacationdays>> GetLeftVacationDays(int userId);
        Task<bool> CheckIfOverlapping(int userId, NewVacationDTO newVacation);
        Task<int> GetDaysLeft(int userId, int absenseId, int days);
        Task<Vacation> AddNewVacation(int userId, NewVacationDTO newVacation);
        Task DeleteVacationRequest(int id);
        Task<IEnumerable<Vacation>> GetAllReplacements();
        Task<IEnumerable<Vacation>> GetReplacementsHistory();
        Task<IEnumerable<Vacation>> GetReplacementsHistory(int userId);
        Task<IEnumerable<Vacation>> GetVacationsHistory();
        Task<IEnumerable<Vacation>> GetVacationsHistory(int userId);
        Task<List<ChartData>> GetStats();





    }
}