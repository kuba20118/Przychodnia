namespace back_end.DTOs
{
    public class UserRegisterDTO
    {
        public string Mail { get; set; }
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int idRole { get; set; }
    }
}