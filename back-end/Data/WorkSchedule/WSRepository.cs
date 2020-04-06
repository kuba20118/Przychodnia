using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Przychodnia.API;

namespace back_end.Data
{
    public class WSRepository : GenericRepository, IWSRepository
    {
        private readonly DataContext _context;

        public WSRepository(DataContext context) : base(context)
        {
            _context = context;
        }
        public async Task<Workschedule> GetUserWS(int userId)
        {
            var wsToReturn = await _context.Workschedule
                        .Include(d => d.Day)
                        .FirstOrDefaultAsync(u => u.IdUser == userId);

            return wsToReturn;
        }

        public Task<IEnumerable<Workschedule>> GetWorkSchedules()
        {
            throw new System.NotImplementedException();
        }
    }
}