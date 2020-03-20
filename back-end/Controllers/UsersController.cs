using System.Threading.Tasks;
using back_end.Data;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController  : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        // [HttpGet("{id}")]
        // public async Task<IActionResult> Test(int id)
        // {
           
        //     return Ok(id);
        // }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            return Ok(user);
        }
    }
}