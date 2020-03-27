using System;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using back_end.Data;
using back_end.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Przychodnia.API;

namespace back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IUserRepository _repoUser;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IUserRepository repoUser, IConfiguration configuration, IMapper mapper)
        {
            _repo = repo;
            _repoUser = repoUser;
            _configuration = configuration;
            _mapper = mapper;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO userLoginDTO)
        {
            var user = await _repo.Login(userLoginDTO.Mail.ToLower(), userLoginDTO.Password);

            if (user == null)
                return Unauthorized();

            var userFromRepo = await _repoUser.GetUser(user.IdUser);
            var userToReturn = _mapper.Map<UserReturnDTO>(userFromRepo);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.IdUser.ToString()),
                new Claim(ClaimTypes.Name, user.Mail)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(12),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token), userToReturn });
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
            var userFromRepo = await _repoUser.GetUser(createdUser.IdUser);
            var userToReturn = _mapper.Map<UserReturnDTO>(userFromRepo);

            return CreatedAtRoute("GetUser", new { controller = "Users", Id = createdUser.IdUser }, userToReturn);
        }
    }
}