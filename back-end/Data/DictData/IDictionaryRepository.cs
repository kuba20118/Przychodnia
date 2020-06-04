using System.Collections.Generic;
using System.Threading.Tasks;
using Przychodnia.API;

namespace back_end.Data
{
    public interface IDictionaryRepository : IGenericRepository
    {
        Task<IEnumerable<Role>> GetRoles();
        Task<Role> GetRole(int roleId);
        Task<Role> AddRole(string name);
        Task<Absence> AddAbsenceType(string name, int limit);
        Task<IEnumerable<Absence>> GetAbsences();
        Task<Absence> GetAbsence(int id);


    }
}