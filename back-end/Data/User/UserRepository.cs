using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.DTOs;
using back_end.DTOs.Vacation;
using back_end.Helpers;
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
                  .Include(v => v.Vacation)
                  .ToListAsync();


      return users;
    }

    public async Task<Vacationrequest> AddNewVacationRequest(int userId, NewVacationRequestDTO request)
    {
      var user = await GetUser(userId);
      var newReq = new Vacationrequest
      {
        FromDate = request.FromDate,
        ToDate = request.ToDate,
        Reason = request.Reason,
        IdUserNavigation = user,
        IdAbsence = request.IdAbsence
      };

      await _context.Vacationrequest.AddAsync(newReq);
      await _context.SaveChangesAsync();

      return newReq;
    }

    public async Task<Employment> GetUserEmployment(int userId)
    {
      var empl = await _context.Employment
                  .FirstOrDefaultAsync(x => x.User.Any(d => d.IdUser == userId));

      return empl;
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

    public async Task<bool> CheckIfOverlapping(int userId, NewVacationDTO newVacation)
    {
      var UserVacList = await _context.Vacation
              .Where(u => u.IdUserVac == userId)
              .ToListAsync();

      var check = UserVacList
                  .Any(d =>
                  newVacation.FromDate.IsBewteenTwoDates(d.FromDate, d.ToDate) ||
                  newVacation.ToDate.IsBewteenTwoDates(d.FromDate, d.ToDate) ||
                  ((d.ToDate).IsBewteenTwoDates(newVacation.FromDate, newVacation.ToDate) &&
                  (d.FromDate).IsBewteenTwoDates(newVacation.FromDate, newVacation.ToDate)
                  ));

      return check;
    }

    public async Task<IEnumerable<Vacation>> GetAllVacations()
    {
      var usersVac = await _context.Vacation
                  .Where(d => d.FromDate.DayOfYear <= DateTime.Now.DayOfYear && d.ToDate.DayOfYear >= DateTime.Now.DayOfYear)
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

    public async Task<int> GetDaysLeft(int userId, int absenseId, int days)
    {
      var isAvailable = await _context.Leftvacationdays
                  .Where(u => u.IdUser == userId)
                  .Where(v => v.IdAbsenceNavigation.IdAbsence == absenseId)
                  //.Where(l => l.LeftDays >= days)
                  .FirstAsync();

      return (int)isAvailable.LeftDays;
    }
    public async Task<Vacation> AddNewVacation(int userId, NewVacationDTO newVacation)
    {

      var user = await GetUser(userId);
      var absence = await _context.Absence
              .FirstOrDefaultAsync(x => x.IdAbsence == newVacation.IdAbsence);
      var newVac = new Vacation
      {
        FromDate = newVacation.FromDate,
        ToDate = newVacation.ToDate,
        IdUserVacNavigation = user,
        IdAbsenceVacNavigation = absence
      };

      var vacLeft = await _context.Leftvacationdays
                  .Where(x => x.IdUser == userId)
                  .Where(x => x.IdAbsence == newVacation.IdAbsence)
                  .FirstOrDefaultAsync();

      var totalVacDays = (newVacation.ToDate - newVacation.FromDate).Days + 1;
      vacLeft.LeftDays -= totalVacDays;

      //zastepstwo

      var userForReplacemt = await GetUser(newVacation.UserForReplacentId);
      var replacement = await _context.Absence
              .FirstOrDefaultAsync(x => x.IdAbsence == 9);
      var newReplacement = new Vacation
      {
        FromDate = newVacation.FromDate,
        ToDate = newVacation.ToDate,
        IdUserVacNavigation = userForReplacemt,
        IdAbsenceVacNavigation = replacement
      };


      await _context.Vacation.AddAsync(newVac);
      await _context.Vacation.AddAsync(newReplacement);
      await _context.SaveChangesAsync();

      return newVac;

    }
  }
}