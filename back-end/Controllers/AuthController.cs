using System.Diagnostics;
using System.Threading.Tasks;
using back_end.Data;
using back_end.DTOs;
using Microsoft.AspNetCore.Mvc;
using Przychodnia.API;

namespace back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTO userRegisterDTO)
        {
            userRegisterDTO.Mail = userRegisterDTO.Mail.ToLower();
            if (await _repo.UserExists(userRegisterDTO.Mail))
                return BadRequest("Mail jest zajęty");

            var newUser = new User
            {
                Mail = userRegisterDTO.Mail,
                FirstName = userRegisterDTO.FirstName,
                LastName = userRegisterDTO.LastName
            };
            
            var createdUser = await _repo.Register(newUser, userRegisterDTO.Password, userRegisterDTO.idRole);

            return Ok("createdUser");
        }
    }
}