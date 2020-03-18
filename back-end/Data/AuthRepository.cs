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

        public async Task<User> login(string mail, string password)
        {
            var user = await _context.User.FirstOrDefaultAsync(x =>x.Mail==mail);

            if(user == null)
                return null;

            if(!VerifyHash(password, user.Hash, user.Salt))
                return null;

            return user;
        }

        

        public async Task<User> Register(User user, string password, int role)
        {
            byte[] passwordHash, passwordSalt;
            CreatePassword(password, out passwordHash, out passwordSalt);
          
            //user.Hash = "1";//Encoding.Default.GetString(passwordHash);
            //user.Salt = "2";//Encoding.Default.GetString(passwordSalt);
            user.Password = "a";
            user.FirstName = "b";
            user.LastName = "c";
            user.IdRole = role;
           // user.IdEmpl = 1;
            //user.Mail = 
         
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }     

        public async Task<bool> UserExists(string mail)
        {
            if(await _context.User.AnyAsync(x=>x.Mail == mail))
                return true;
           

            return false;
        }


        private bool VerifyHash(string password, string hash, string salt)
        {
             using(var hmac = new System.Security.Cryptography.HMACSHA512(Encoding.UTF8.GetBytes(salt)))
            {              
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                var passwordHash = Encoding.UTF8.GetBytes(hash);

                for(int i = 0; i< computedHash.Length;i++)
                {
                    if(computedHash[i] != passwordHash[i])
                        return false;
                }
            return true;

            }
        }
         private void CreatePassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordHash = hmac.Key;
                passwordSalt = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}