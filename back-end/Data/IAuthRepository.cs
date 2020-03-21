using System.Threading.Tasks;
using Przychodnia.API;

namespace back_end.Data
{
    public interface IAuthRepository
    {
         Task<User> Login(string mail, string password);
         Task<User> Register(User user, string password, int role);
         Task<bool> UserExists(string mail);
    }
}