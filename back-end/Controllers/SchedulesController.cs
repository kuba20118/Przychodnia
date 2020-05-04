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
            var wsToReturn = _mapper.Map<WorkScheduleReturn>(ws);

            return Ok(wsToReturn);
        }

        [HttpPost("generate/{id}")]
        public async Task<IActionResult> GenerateUserWorkSchedule(int id, WorkScheduleNewDTO newWS)
        {
            if(await _userRepo.GetUser(id) == null)
                return Content("Brak usera o podanym id");
            
            if(newWS.Day.Count != 7)
                return Content("Wymagane jest podanie całego tygodnia");

            if(newWS.NumberOfWeeks < 1)
                return Content("Podaj liczbę tygodni");
            
            var userVacation = await _userRepo.GetVacations(id);
            var vacDayList = _repo.VacationDaysToList(userVacation);
            var wsRsult = await _repo.GenerateUserWS(id, newWS,vacDayList);
            var wsToReturn = _mapper.Map<WorkScheduleReturn>(wsRsult);
            return Ok(wsToReturn);
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateWorkSchedule(WorkScheduleNewDTO newWS)
        {
            // if(await _userRepo.GetUser(id) == null)
            //     return Content("Brak usera o podanym id");
            
            if(newWS.Day.Count != 7)
                return Content("Wymagane jest podanie całego tygodnia");

            if(newWS.NumberOfWeeks < 1)
                return Content("Podaj liczbę tygodni");
            
            var users = await _userRepo.GetUsers();

            // var userVacation = await _userRepo.GetVacations(id);
            // var vacDayList = _repo.VacationDaysToList(userVacation);
            var wsRsult = await _repo.GenerateWS(users, newWS);
            var wsToReturn = _mapper.Map<IEnumerable<WorkScheduleReturn>>(wsRsult);
            return Ok(wsToReturn);
        }


    }
}