using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.DTOs;
using back_end.DTOs.Vacation;
using back_end.Helpers;
using Microsoft.AspNetCore.Authorization;
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
                                    .Where(x => x.FromDate.DayOfYear >= DateTime.Now.DayOfYear || x.ToDate.DayOfYear >= DateTime.Now.DayOfYear)
                                    .Where(x => x.IdAbsenceVacNavigation.Name != "Zastepstwo")
                                    .Include(a => a.IdAbsenceVacNavigation)
                                    .Include(u => u.IdUserVacNavigation)
                                    .ToListAsync();

            return usersVac;
        }

        public async Task<IEnumerable<Leftvacationdays>> GetLeftVacationDays(int userId)
        {
            var daysLeft = await _context.Leftvacationdays
                                    .Where(u => u.IdUser == userId)
                                    .Where(v => v.IdAbsenceNavigation.Name != "Zadanie")
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

        public async Task<IEnumerable<Vacationrequest>> GetUserRequests(int userId)
        {
            var requests = await _context.Vacationrequest
                    .Where(x => x.IdUser == userId)
                    .Include(x => x.IdAbsenceNavigation)
                    .ToListAsync();
            return requests;
        }
        public async Task DeleteVacationRequest(int id)
        {
            var request = await _context.Vacationrequest
                .SingleOrDefaultAsync(x => x.IdRequest == id);

            if (request != null)
            {
                _context.Remove(request);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<IEnumerable<Vacation>> GetAllReplacements()
        {
            var repls = await _context.Vacation
                .Include(x => x.IdAbsenceVacNavigation)
                .Where(x => x.IdAbsenceVacNavigation.Name == "Zastepstwo")
                .Where(x => x.FromDate.DayOfYear >= DateTime.Now.DayOfYear || x.ToDate.DayOfYear >= DateTime.Now.DayOfYear)
                .Include(x => x.IdUserVacNavigation)
                .ToListAsync();

            return repls;
        }

        public async Task<IEnumerable<Vacation>> GetReplacementsHistory()
        {
            var history = await _context.Vacation
                .Include(x => x.IdAbsenceVacNavigation)
                .Where(x => x.IdAbsenceVacNavigation.Name == "Zastepstwo")
                .Where(x => x.ToDate.DayOfYear < DateTime.Now.DayOfYear)
                .Include(x => x.IdUserVacNavigation)
                .ToListAsync();

            return history;
        }

        public async Task<IEnumerable<Vacation>> GetReplacementsHistory(int userId)
        {
            var history = await _context.Vacation
                .Include(x => x.IdAbsenceVacNavigation)
                .Where(x => x.IdAbsenceVacNavigation.Name == "Zastepstwo")
                .Where(x => x.ToDate.DayOfYear < DateTime.Now.DayOfYear)
                .Where(x => x.IdUserVacNavigation.IdUser == userId)
                .Include(x => x.IdUserVacNavigation)
                .ToListAsync();

            return history;
        }

        public async Task<IEnumerable<Vacation>> GetVacationsHistory()
        {
            var history = await _context.Vacation
                .Include(x => x.IdAbsenceVacNavigation)
                .Where(x => x.IdAbsenceVacNavigation.Name != "Zastepstwo")
                .Where(x => x.ToDate.DayOfYear < DateTime.Now.DayOfYear)
                .Include(x => x.IdUserVacNavigation)
                .ToListAsync();

            return history;
        }

        public async Task<IEnumerable<Vacation>> GetVacationsHistory(int userId)
        {
            var history = await _context.Vacation
                .Include(x => x.IdAbsenceVacNavigation)
                .Where(x => x.IdAbsenceVacNavigation.Name != "Zastepstwo")
                .Where(x => x.ToDate.DayOfYear < DateTime.Now.DayOfYear)
                .Where(x => x.IdUserVacNavigation.IdUser == userId)
                .Include(x => x.IdUserVacNavigation)
                .ToListAsync();

            return history;
        }
        private async Task<IEnumerable<Vacation>> AllVacs()
        {
            var vacs = await _context.Vacation
                .Include(x => x.IdAbsenceVacNavigation)
                .Where(x => x.IdAbsenceVacNavigation.Name != "Zastepstwo")
                .ToListAsync();

            return vacs;
        }

        public async Task<List<ChartData>> GetStats()
        {
            var list1 = VacationDaysToList(await AllVacs());
            var months = new int[12];
            foreach (var item in list1)
                months[item.FromTime.Month - 1]++;

            var monthsList = new List<Tuple<string, int>>
            {
                new Tuple<string, int>("Styczeń",months[0]),
                new Tuple<string, int>("Luty",months[1]),
                new Tuple<string, int>("Marzec",months[2]),
                new Tuple<string, int>("Kwiecień",months[3]),
                new Tuple<string, int>("Maj",months[4]),
                new Tuple<string, int>("Czerwiec",months[5]),
                new Tuple<string, int>("Lipiec",months[6]),
                new Tuple<string, int>("Sierpień",months[7]),
                new Tuple<string, int>("Wrzesień",months[8]),
                new Tuple<string, int>("Październik",months[9]),
                new Tuple<string, int>("Listopad",months[10]),
                new Tuple<string, int>("Grudzień",months[11])
            };

            var vacsMonths = new ChartData
            {
                Title = "Urlopy",
                Key = "vacations",
                ChartType = "Bar",
                Data = Unpack(monthsList)
            };

            var chartsList = new List<ChartData> { vacsMonths };
            return chartsList;
        }

        public List<Day> VacationDaysToList(IEnumerable<Vacation> vacs)
        {
            var dayList = new List<Day>();
            foreach (var vac in vacs)
            {
                var days = vac.ToDate.DayOfYear - vac.FromDate.DayOfYear + 1;
                for (int i = 0; i < days; i++)
                {
                    var fromTime = vac.FromDate.AddDays(i);
                    var toTime = fromTime.AddHours(23).AddMinutes(59).AddSeconds(59);

                    var newDay = new Day
                    {
                        FromTime = fromTime,
                        ToTime = toTime,
                        Type = ""
                    };
                    dayList.Add(newDay);
                }
            }
            return dayList;
        }
        Tuple<List<A>, List<B>> Unpack<A, B>(List<Tuple<A, B>> list)
        {
            return list.Aggregate(Tuple.Create(new List<A>(list.Count), new List<B>(list.Count)),
            (unpacked, tuple) =>
            {
                unpacked.Item1.Add(tuple.Item1);
                unpacked.Item2.Add(tuple.Item2);
                return unpacked;
            });
        }

    }
}