using System.ComponentModel.DataAnnotations;

namespace back_end.DTOs
{
    public class UserRegisterDTO
    {
        [Required(ErrorMessage="Mail jest wymagany")]
        public string Mail { get; set; }

        [Required(ErrorMessage="Hasło jest wymagane")]
     
        public string Password { get; set; }
        [Required(ErrorMessage="Imię jest wymagane")]
        public string FirstName { get; set; }
        [Required(ErrorMessage="Nazwisko jest wymagane")]
        public string LastName { get; set; }
        [Required(ErrorMessage="Stanowisko jest wymagane")]
        public int idRole { get; set; }
    }
}