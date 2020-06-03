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
using back_end.DTOs.WorkSchedule;
using back_end.DTOs.Vacation;
using System;
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;

        private readonly IWSRepository _wSRepo;

        public StatsController(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetStats()
        {

            return Ok(await _userRepo.GetStats());
        }

    }
}