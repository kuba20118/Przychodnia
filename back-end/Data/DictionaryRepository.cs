using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Przychodnia.API;

namespace back_end.Data
{
    public class DictionaryRepository : GenericRepository, IDictionaryRepository
    {
        private readonly DataContext _context;

        public DictionaryRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Role> AddRole(string name)
        {
            var newRole = new Role { Name = name };

            await _context.Role.AddAsync(newRole);
            await _context.SaveChangesAsync();

            return newRole;
        }

        public async Task<IEnumerable<Absence>> GetAbsences()
        {
            var absences = await _context.Absence.ToListAsync();

            return absences;
        }

        public async Task<Role> GetRole(int roleId)
        {
            var role = await _context.Role.FirstOrDefaultAsync(r => r.IdRole == roleId);

            return role;
        }

        public async Task<IEnumerable<Role>> GetRoles()
        {
            var roles = await _context.Role.ToListAsync();

            return roles;
        }
    }
}