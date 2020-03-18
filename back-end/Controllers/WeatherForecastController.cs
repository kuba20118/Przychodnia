using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Przychodnia.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly DataContext _context;
        private readonly IAuthRepository _repo;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, DataContext context, IAuthRepository repo)
        {          
            _logger = logger;
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {          
            var user = new User();
            await _repo.Register(user, "dupa", 1);     
            return Ok(user);
        }
    }
}
