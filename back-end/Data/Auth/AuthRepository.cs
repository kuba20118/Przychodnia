using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Przychodnia.API;

namespace back_end.Data
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;

    public AuthRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<User> Login(string mail, string password)
    {
      var user = await _context.User.FirstOrDefaultAsync(x => x.Mail == mail);

      if (user == null)
        return null;

      if (!VerifyHash(password, user.Hash, user.Salt))
      {
        System.Console.WriteLine("err");
        return null;
      }

      return user;
    }

    public async Task<User> Register(User user, string password, int role)
    {
      byte[] passwordHash, passwordSalt;

      CreatePassword(password, out passwordHash, out passwordSalt);
      user.Hash = passwordHash;
      user.Salt = passwordSalt;

      var UserRole = await _context.Role.FirstOrDefaultAsync(x => x.IdRole == role);
      user.IdRoleNavigation = UserRole;

      var newEmpl = new Employment()
      {
        HireDate = DateTime.Now,
        CurrentyEmployed = 1,
        WorkingHours = 8,
      };
      user.IdEmplNavigation = newEmpl;



      var absences = await _context.Absence.ToListAsync();

      foreach (var item in absences)
      {
        var vacLeft = new Leftvacationdays
        {
          IdAbsenceNavigation = item,
          LeftDays = item.Limit,
          IdUserNavigation = user
        };

        await _context.Leftvacationdays.AddAsync(vacLeft);
      }


      await _context.Employment.AddAsync(newEmpl);
      await _context.User.AddAsync(user);
      await _context.SaveChangesAsync();

      return user;
    }

    public async Task<bool> UserExists(string mail)
    {
      if (await _context.User.AnyAsync(x => x.Mail == mail))
        return true;


      return false;
    }


    private bool VerifyHash(string password, byte[] hash, byte[] salt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
      {
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        if (computedHash.Length == hash.Length)
        {
          for (int i = 0; i < computedHash.Length; i++)
          {
            if (computedHash[i] != hash[i])
              return false;
          }
        }

        return true;

      }
    }
    private void CreatePassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordHash = hmac.Key;
        passwordSalt = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
      }
    }
  }
}