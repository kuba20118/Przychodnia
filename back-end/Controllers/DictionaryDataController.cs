using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using back_end.Data;
using back_end.DTOs.Vacation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Przychodnia.API;

namespace back_end.Controllers
{
    /*
    CRUD:
    -Role
    -Absence
    */
    [Authorize(Policy = "admin")]
    [ApiController]
    [Route("[controller]")]
    public class DictionaryDataController : ControllerBase
    {
        private readonly IDictionaryRepository _repo;
        private readonly IMapper _mapper;

        public DictionaryDataController(IDictionaryRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("roles")]
        [Authorize]
        public async Task<IActionResult> GetRoles()
        {
            var rolesToReturn = await _repo.GetRoles();
            return Ok(rolesToReturn);
        }

        [HttpGet("roles/{id}")]
        public async Task<IActionResult> GetRole(int id)
        {
            var roleToReturn = await _repo.GetRole(id);
            return Ok(roleToReturn);
        }

        [HttpPost("roles/add")]
        public async Task<IActionResult> AddRole(Role newRole)
        {
            var roleToReturn = await _repo.AddRole(newRole.Name);
            return Ok(roleToReturn);
        }
        [HttpPost("absences/add")]
        public async Task<IActionResult> AddAbsenceType(Absence newAbsence)
        {
            var typeToReturn = await _repo.AddAbsenceType(newAbsence.Name, newAbsence.Limit);
            return Ok(typeToReturn);
        }

        [HttpPut("roles/update/{id}")]
        public async Task<IActionResult> UpdateRole(int id, Role newName)
        {
            var rolesFromRepo = await _repo.GetRole(id);

            if (rolesFromRepo == null)
                return Content("Błędne roleId");

            if (id <= 4)
                return Content("Nie można zmienić podstawowych ról");

            if (rolesFromRepo.Name == newName.Name)
                return Content("Podaj nową nazwę");

            rolesFromRepo.Name = newName.Name;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Błąd aktualizacji roli o id: {id}");
        }

        [HttpGet("absences")]
        public async Task<IActionResult> GetAbsencesType()
        {
            var absencesFromRepo = await _repo.GetAbsences();
            var absencesToReturn = _mapper.Map<IEnumerable<AbsenceDTO>>(absencesFromRepo);

            return Ok(absencesToReturn);
        }

        [HttpPut("absences/update/{id}")]
        public async Task<IActionResult> UpdateAbsence(int id, Absence newName)
        {
            var absenceFromRepo = await _repo.GetAbsence(id);

            if (absenceFromRepo == null)
                return Content("Błędne absenceId");

            if (id <= 9)
                return Content("Nie można zmienić podstawowych nieobecności");

            if (absenceFromRepo.Name == newName.Name)
                return Content("Podaj nową nazwę");

            absenceFromRepo.Name = newName.Name;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Błąd aktualizacji nieobecności o id: {id}");
        }
    }
}