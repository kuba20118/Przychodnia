using System.Threading.Tasks;
using AutoMapper;
using back_end.Data;
using back_end.DTOs;
using back_end.DTOs.Employment;
using Microsoft.AspNetCore.Mvc;
using Przychodnia.API;

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
            //var user = await _userRepo.GetUser(id);

            var ws = await _repo.GenerateUserWS(id, newWS);
            var wsToReturn = _mapper.Map<WorkScheduleReturn>(ws);

            return Ok(wsToReturn);
        }


    }
}