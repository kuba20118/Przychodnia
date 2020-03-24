using System;
using System.Collections.Generic;
using System.Linq;
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
                        .Include(e => e.IdEmplNavigation)
                        .Include(r => r.IdRoleNavigation)
                        .FirstOrDefaultAsync(u => u.IdUser == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.User
                        .Where(u => u.IdEmplNavigation.CurrentyEmployed == 1)
                        .Include(e => e.IdEmplNavigation)
                        .Include(r => r.IdRoleNavigation)
                        .ToListAsync();


            return users;
        }

        public Task<Employment> UpdateEmployment(int userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Vacation>> GetVacations(int userId)
        {
            var userVac = await _context.Vacation
                        .Where(u => u.IdUserVac == userId)
                        .Include(a => a.IdAbsenceVacNavigation)
                        .Include(u => u.IdUserVacNavigation)
                        .ToListAsync();

            return userVac;
        }

        public async Task<IEnumerable<Vacation>> GetAllVacations()
        {
            var usersVac = await _context.Vacation
                         .Where(d => d.FromDate <= DateTime.Now && d.ToDate >= DateTime.Now)
                         .Include(a => a.IdAbsenceVacNavigation)
                         .Include(u => u.IdUserVacNavigation)
                         .ToListAsync();

            return usersVac;
        }

        public async Task<IEnumerable<Leftvacationdays>> GetLeftVacationDays(int userId)
        {
            var daysLeft = await _context.Leftvacationdays
                         .Where(u => u.IdUser == userId)
                         //.Where(v => v.IdAbsenceNavigation.Name != "L4")
                         .Include(u => u.IdUserNavigation)
                         .Include(a => a.IdAbsenceNavigation)
                         .ToListAsync();

            return daysLeft;
        }


    }
}