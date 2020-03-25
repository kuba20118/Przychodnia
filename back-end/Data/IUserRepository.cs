using System.Collections.Generic;
using System.Threading.Tasks;
using Przychodnia.API;

namespace back_end.Data
{
    public interface IUserRepository : IGenericRepository
    {
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);

         Task<Employment> GetUserEmployment(int userId);
         
         Task<IEnumerable<Vacation>> GetAllVacations();
         Task<IEnumerable<Vacation>> GetVacations(int userId);
        Task<IEnumerable<Leftvacationdays>> GetLeftVacationDays(int userId);



    }
}