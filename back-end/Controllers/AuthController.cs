using System.Threading.Tasks;
using back_end.Data;
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
        public async Task<IActionResult> Register()//string mail, string password, int role)
        {
         
            string mail = "a@a.a";
            string password = "abc";
            int role = 1;
            mail = mail.ToLower();
            if(await _repo.UserExists(mail))
                return BadRequest("Mail jest zajęty");

            var newUser = new User
            {   
                Mail = mail
            };

            var createdUser = _repo.Register(newUser, password, role);

            return Ok(newUser);
        }
    }
}