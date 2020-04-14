using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using back_end.DTOs.Employment;
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

        public async Task<IEnumerable<Workschedule>> GenerateUserWS(int userId, WorkScheduleNewDTO newWS)
        {
            var user = await _context.User
                    .FirstOrDefaultAsync(u => u.IdUser == userId);

            var wsList = new List<Workschedule>();
            if (newWS.Day.Count == 0)
                return wsList;

            for (int i = 0; i < newWS.NumberOfWeeks; i++)
            {
                var ws = new Workschedule();
                var dayList = new List<Day>();

                foreach (var day in newWS.Day)
                {
                    var newDay = new Day
                    {
                        FromTime = day.FromTime.AddDays(i * 7),
                        ToTime = day.ToTime.AddDays(i * 7),
                        IdWsNavigation = ws,
                        Type = day.Type
                    };

                    dayList.Add(newDay);
                    await _context.Day.AddAsync(newDay);
                }

                ws.IdUserNavigation = user;
                ws.Day = dayList;

                wsList.Add(ws);
                await _context.Workschedule.AddAsync(ws);
            }

            await _context.SaveChangesAsync();

            return wsList;
        }

        public async Task<Workschedule> GetUserWS(int userId)
        {
            var ws = await _context.Workschedule
                        .Include(d => d.Day)
                        .Where(u => u.IdUser == userId)
                        .ToListAsync();
            var dayList = new List<Day>();

            foreach (var item in ws.SelectMany(x => x.Day))
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

        public Task<IEnumerable<Workschedule>> GetWorkSchedules()
        {
            throw new System.NotImplementedException();
        }
    }
}