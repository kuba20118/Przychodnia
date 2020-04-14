using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using back_end.Data;
using back_end.DTOs;
using back_end.DTOs.Employment;
using Microsoft.AspNetCore.Mvc;
using Przychodnia.API;
using System.Linq;
using back_end.Helpers;

namespace back_end.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class SchedulesController : ControllerBase
    {
        private readonly IWSRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;

        public SchedulesController(IWSRepository repo, IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserWorkSchedule(int id)
        {
            var ws = await _repo.GetUserWS(id);
            var wsToReturn = _mapper.Map<IEnumerable<WorkScheduleReturn>>(ws);

            return Ok(wsToReturn);
        }

        [HttpPost("generate/{id}")]
        public async Task<IActionResult> GenerateUserWorkSchedule(int id, WorkScheduleNewDTO newWS)
        {
            var wsFromRepo = await _repo.GetUserWS(id);
            var wsFromParams = _mapper.Map<Workschedule>(newWS);

            foreach (var item in wsFromParams.Day.Reverse<Day>())
            {
                if (wsFromRepo.Day.Any(d => d.FromTime.DayOfYear == item.FromTime.DayOfYear))
                {
                    wsFromParams.Day.Remove(item);
                }
            }

            //var user = await _userRepo.GetUser(id);
            //var test = _mapper.Map<Workschedule>(newWS);
            //var newList = new List<Day>();
            // if (x != null)
            // {
            //     foreach (var item in test.Day.Reverse<Day>())
            //     {
            //         if (x.Day.Any(d => d.FromTime.DayOfYear == item.FromTime.DayOfYear))
            //         {
            //             //test.Day.Remove(item);
            //         }
            //     }
            // }
            //test.Day = newList;
            //_mapper.Map(test, newWS);
            var ws = _mapper.Map<WorkScheduleNewDTO>(wsFromParams);
            var wsRet = await _repo.GenerateUserWS(id, ws);
            //var wsToReturn = _mapper.Map<IEnumerable<WorkScheduleReturn>>(ws);
            var wsToReturn = _mapper.Map<WorkScheduleReturn>(wsRet);
            return Ok(wsFromParams);
        }


    }
}