using System;

namespace back_end.DTOs
{
    public class UserUpdateDTO
    {
        public int IdRole { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int WorkingHours { get; set; }
        public sbyte CurrentyEmployed { get; set; }
        public DateTime? FireDate { get; set; }

    }
}