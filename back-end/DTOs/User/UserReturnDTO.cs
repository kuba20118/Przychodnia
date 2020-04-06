using System;
using Przychodnia.API;

namespace back_end.DTOs
{
    public class UserReturnDTO
    {
        public string idUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mail { get; set; }
        public string Role { get; set; }
        public int WorkingHours { get; set; }
        public bool CurrentyEmployed { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime? FireDate { get; set; }
    }
}