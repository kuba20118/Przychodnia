using System.Threading.Tasks;
using AutoMapper;
using back_end.Data;
using back_end.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class SchedulesController : ControllerBase
    {
        private readonly IWSRepository _repo;
        private readonly IMapper _mapper;

        public SchedulesController(IWSRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserWorkSchedule(int id)
        {
            var ws = await _repo.GetUserWS(id);
            var wsToReturn = _mapper.Map<WorkScheduleDTO>(ws);
            return Ok(wsToReturn);
        }

    }
}