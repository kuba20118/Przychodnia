using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using back_end.DTOs.Employment;
using back_end.DTOs.WorkSchedule;
using Microsoft.EntityFrameworkCore;
using Przychodnia.API;

namespace back_end.Data
{
    public class WSRepository : GenericRepository, IWSRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public WSRepository(DataContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _context = context;
        }

        public List<Day> VacationDaysToList(IEnumerable<Vacation> userVac)
        {
            var dayList = new List<Day>();
            foreach (var vac in userVac)
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
                        Type = vac.IdAbsenceVacNavigation.Name
                    };
                    dayList.Add(newDay);
                }
            }
            return dayList;
        }
        public async Task<Workschedule> GenerateUserWS(int userId, WorkScheduleNewDTO newWS, List<Day> vacList)
        {
            var user = await _context.User
                    .FirstOrDefaultAsync(u => u.IdUser == userId);

            var wsList = new List<Workschedule>();
            var wsFromRepo = await GetUserWS(userId);

            for (int i = 0; i < newWS.NumberOfWeeks; i++)
            {
                var ws = new Workschedule();
                var dayList = new List<Day>();

                foreach (var day in newWS.Day)
                {
                    Day newDay;
                    var fromTime = day.FromTime.AddDays(i * 7);
                    var toTime = day.ToTime.AddDays(i * 7);

                    var vacDay = vacList.FirstOrDefault(d => d.FromTime.DayOfYear == fromTime.DayOfYear);
                    var currentDay = wsFromRepo.Day.FirstOrDefault(d => d.FromTime.DayOfYear == fromTime.DayOfYear);
                    if (vacDay != null)
                    {
                        newDay = vacDay;
                        if (newDay.Type == "Zastepstwo")
                        {
                            newDay.FromTime = fromTime;
                            newDay.ToTime = toTime;
                        }

                        if (currentDay != null)
                            _context.Remove(currentDay);

                        dayList.Add(newDay);
                        await _context.Day.AddAsync(newDay);
                    }
                    else if (currentDay == null)
                    {
                        newDay = new Day
                        {
                            FromTime = fromTime,
                            ToTime = toTime,
                            IdWsNavigation = ws,
                            Type = "Praca"
                        };

                        dayList.Add(newDay);
                        await _context.Day.AddAsync(newDay);
                    }
                    //else if (currentDay.Type == "Praca")
                    //{
                    //    newDay = currentDay;
                    //    dayList.Add(newDay);
                    //    await _context.Day.AddAsync(newDay);
                    //}
                }
                ws.IdUserNavigation = user;
                ws.Day = dayList;

                wsList.Add(ws);
                await _context.Workschedule.AddAsync(ws);
            }
            await _context.SaveChangesAsync();

            var wsToReturn = await GetUserWS(userId);
            return wsToReturn;
        }

        public async Task<Workschedule> GetUserWS(int userId)
        {
            var ws = await _context.Day
                        .Where(u => u.IdWsNavigation.IdUser == userId)
                        .ToListAsync();
            var dayList = new List<Day>();

            foreach (var item in ws)
            {
                dayList.Add(item);
            }

            var wsToReturn = new Workschedule()
            {
                IdUser = userId,
                Day = dayList
            };

            return wsToReturn;
        }

        public async Task<Day> GetDayByNumber(int userId, int dayNumber)
        {
            var dayFromRepo = await _context.Day
                    .Where(u => u.IdWsNavigation.IdUser == userId)
                    .FirstOrDefaultAsync(d => d.FromTime.DayOfYear == dayNumber);

            return dayFromRepo;
        }
        public Task<IEnumerable<Workschedule>> GetWorkSchedules()
        {
            throw new System.NotImplementedException();
        }

        public async Task<Workschedule> GenerateWS(IEnumerable<User> users, WorkScheduleNewDTO newWS)
        {
            foreach (var user in users)
            {
                var wsFromRepo = await GetUserWS(user.IdUser);
                var wsList = new List<Workschedule>();

                var userVac = await _context.Vacation
                    .Where(u => u.IdUserVac == user.IdUser)
                    .Include(a => a.IdAbsenceVacNavigation)
                    .Include(u => u.IdUserVacNavigation)
                    .ToListAsync();

                var vacList = VacationDaysToList(userVac);
                for (int i = 0; i < newWS.NumberOfWeeks; i++)
                {
                    var ws = new Workschedule();
                    var dayList = new List<Day>();

                    foreach (var day in newWS.Day)
                    {
                        Day newDay;
                        var fromTime = day.FromTime.AddDays(i * 7);
                        var toTime = day.ToTime.AddDays(i * 7);

                        var vacDay = vacList.FirstOrDefault(d => d.FromTime.DayOfYear == fromTime.DayOfYear);
                        var currentDay = wsFromRepo.Day.FirstOrDefault(d => d.FromTime.DayOfYear == fromTime.DayOfYear);
                        if (vacDay != null)
                        {
                            newDay = vacDay;
                            if (newDay.Type == "Zastepstwo")
                            {
                                newDay.FromTime = fromTime;
                                newDay.ToTime = toTime;
                            }

                            if (currentDay != null)
                                _context.Remove(currentDay);

                            dayList.Add(newDay);
                            await _context.Day.AddAsync(newDay);
                        }
                        else if (currentDay == null)
                        {
                            newDay = new Day
                            {
                                FromTime = fromTime,
                                ToTime = toTime,
                                IdWsNavigation = ws,
                                Type = "Praca"
                            };

                            dayList.Add(newDay);
                            await _context.Day.AddAsync(newDay);
                        }
                        //else if (currentDay.Type == "Praca")
                        //{
                        //    newDay = currentDay;
                        //    dayList.Add(newDay);
                        //    await _context.Day.AddAsync(newDay);
                        //}
                    }
                    ws.IdUserNavigation = user;
                    ws.Day = dayList;

                    wsList.Add(ws);
                    await _context.Workschedule.AddAsync(ws);
                    await _context.SaveChangesAsync();
                }
            }
            return null;
        }

        public async Task<Day> CheckIfDayExists(int userId, DateTime day)
        {
            var userWs = await GetUserWS(userId);
            return userWs.Day.FirstOrDefault(x => x.FromTime.DayOfYear == day.DayOfYear);
        }

        public async Task<Day> UpdateDay(int userId, DayUpdateDTO newDay)
        {
            //var userWs = await GetUserWS(userId);

            var day = await _context.Day
                    .Where(x => x.FromTime.DayOfYear == newDay.FromTime.DayOfYear)
                    .FirstOrDefaultAsync(x => x.IdWsNavigation.IdUser == userId);
            day.FromTime = Convert.ToDateTime(newDay.FromTime);
            day.ToTime = Convert.ToDateTime(newDay.ToTime);
            day.Type = newDay.Type;

            _context.Day.Update(day);
            await _context.SaveChangesAsync();
            return day;
        }
    }
}