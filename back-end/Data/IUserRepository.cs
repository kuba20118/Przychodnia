using System.Collections.Generic;
using System.Threading.Tasks;
using Przychodnia.API;

namespace back_end.Data
{
    public interface IUserRepository
    {
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         Task<Employment> UpdateEmployment(int userId);
    }
}