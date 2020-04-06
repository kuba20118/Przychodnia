using System.Collections.Generic;
using System.Threading.Tasks;
using Przychodnia.API;

namespace back_end.Data
{
    public interface IWSRepository : IGenericRepository
    {
        Task<Workschedule> GetUserWS(int userId);
        Task<IEnumerable<Workschedule>> GetWorkSchedules();
    }
}