using System.Collections.Generic;
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

        public async Task<Workschedule> GenerateUserWS(int userId, WorkScheduleNewDTO newWS)
        {
            var user = await _context.User
                    .FirstOrDefaultAsync(u => u.IdUser == userId);

            var ws = new Workschedule();
            var dayList = new List<Day>();

            foreach (var day in newWS.Day)
            {
                var newDay = new Day
                {
                    FromTime = day.FromTime,
                    ToTime = day.ToTime,
                    IdWsNavigation = ws,
                    Type = day.Type
                };

                dayList.Add(newDay);
                await _context.Day.AddAsync(newDay);
            }

            ws.IdUserNavigation = user;
            ws.Day = dayList;


            await _context.Workschedule.AddAsync(ws);
            await _context.SaveChangesAsync();

            return ws;
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