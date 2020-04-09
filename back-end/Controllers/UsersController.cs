using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using back_end.Data;
using back_end.DTOs;
using Microsoft.AspNetCore.Mvc;
using Przychodnia.API;

namespace back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        #region Users

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserReturnDTO>(user);
            return Ok(userToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var user = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserReturnDTO>>(user);
            return Ok(usersToReturn);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdateDTO userToUpdate)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userToUpdate, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Błąd aktualizacji danych użytkownika o id: {id}");
        }

        [HttpPut("update/{id}/employment")]
        public async Task<IActionResult> UpdateUserEmployment(int id, EmplUpdateDTO empToUpdate)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            var userEmpl = await _repo.GetUserEmployment(id);
            _mapper.Map(empToUpdate, userEmpl);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Błąd aktualizacji danych o zatrudnieniu użytkownika o id: {id}");
        }

        #endregion

        #region Vacation

        [HttpGet("vacations/{id}")]
        public async Task<IActionResult> GetUserVacations(int id)
        {
            var vacations = await _repo.GetVacations(id);
            var vacToReturn = _mapper.Map<IEnumerable<VacationDTO>>(vacations);
            return Ok(vacToReturn);
        }

        [HttpGet("vacations")]
        public async Task<IActionResult> GetAllVacations()
        {
            var vacations = await _repo.GetAllVacations();
            var vacToReturn = _mapper.Map<IEnumerable<VacationDTO>>(vacations);
            return Ok(vacToReturn);
        }

        [HttpGet("vacations/{id}/left")]
        public async Task<IActionResult> GetLeftVacationDays(int id)
        {
            var daysLeft = await _repo.GetLeftVacationDays(id);
            var daysLeftToReturn = _mapper.Map<IEnumerable<LeftVacationDaysDTO>>(daysLeft);
            return Ok(daysLeftToReturn);
        }

        [HttpPost("vacations/{id}/new")]
        public async Task<IActionResult> SetUserNewVacation(int id, NewVacationDTO newVacation)
        {

            if (newVacation.FromDate > newVacation.ToDate || newVacation.FromDate.DayOfYear < DateTime.Now.DayOfYear)
                return Content("Błędna data urlopu");

            var totalVacDays = (newVacation.ToDate - newVacation.FromDate).Days + 1;
            var daysLeft = await _repo.GetDaysLeft(id, newVacation.IdAbsence, totalVacDays);

            if (daysLeft < totalVacDays)
                return Content("Nie można udzielić urlopu. Brak dni do wybrania");

            if (await _repo.CheckIfOverlapping(id, newVacation))
                return Content("Użytkownik ma już w tym terminie zaplanowany urlop");

            var newVac = await _repo.AddNewVacation(id, newVacation);
            var vacToReturn = _mapper.Map<VacationDTO>(newVac);

            return Ok(vacToReturn);
        }

        #endregion


    }
}