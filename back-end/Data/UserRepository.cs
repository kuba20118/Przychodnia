using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Przychodnia.API;

namespace back_end.Data
{
    public class UserRepository : GenericRepository, IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }
        public async Task<User> GetUser(int id)
        {
            var user = await _context.User
                        .Include(l => l.Leftvacationdays)
                        .Include(v => v.Vacation)
                        .Include(w => w.Workschedule)
                        .FirstOrDefaultAsync(u => u.IdUser == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
             var users = await _context.User
                        .Include(l => l.Leftvacationdays)
                        .Include(v => v.Vacation)
                        .Include(w => w.Workschedule)
                        .ThenInclude(d => d.Day)
                        .ToListAsync();
                        
            return users;
        }

        public Task<Employment> UpdateEmployment(int userId)
        {
            throw new System.NotImplementedException();
        }
    }
}