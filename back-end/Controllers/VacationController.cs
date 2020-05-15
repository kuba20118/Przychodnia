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

namespace back_end.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class VacationController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;

        public VacationController(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpPost("request/add/{id}")]
        public async Task<IActionResult> AddVacationRequest(int id, NewVacationRequestDTO newRequest)
        {
            if (await _userRepo.GetUser(id) == null)
                return Content("Brak usera o podanym id");

            if (newRequest.FromDate > newRequest.ToDate)
                return Content("Błędna data urlopu");

            var totalVacDays = (newRequest.ToDate - newRequest.FromDate).Days + 1;
            var daysLeft = await _userRepo.GetDaysLeft(id, newRequest.IdAbsence, totalVacDays);
	
            if (daysLeft < totalVacDays)
                return Content("Nie można udzielić urlopu. Brak dni do wybrania");

            var req = await _userRepo.AddNewVacationRequest(id, newRequest);
            var result = _mapper.Map<NewVacationRequestDTO>(req);
            return Ok(result);
        }
    }
}