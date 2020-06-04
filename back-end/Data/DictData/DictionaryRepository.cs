using System.Collections.Generic;
using System.Linq;
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

        public async Task<Absence> AddAbsenceType(string name, int limit)
        {
            var newAbsence = new Absence
            {
                Name = name,
                Limit = limit
            };
            await _context.Absence.AddAsync(newAbsence);
            await _context.SaveChangesAsync();

            return newAbsence;
        }

        public async Task<Role> AddRole(string name)
        {
            var newRole = new Role { Name = name };
            await _context.Role.AddAsync(newRole);
            await _context.SaveChangesAsync();

            return newRole;
        }

        public async Task<Absence> GetAbsence(int id)
        {
            var absence = await _context.Absence.FirstOrDefaultAsync(r => r.IdAbsence == id);
            return absence;
        }

        public async Task<IEnumerable<Absence>> GetAbsences()
        {
            var absences = await _context.Absence
                .Where(x => x.Name != "Zalegly")
                .Where(x => x.Name != "Zadanie")
                .Where(x => x.Name != "Zastepstwo")
                .ToListAsync();

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