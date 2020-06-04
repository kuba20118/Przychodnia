using System.Collections;
using System.Collections.Generic;

namespace back_end.DTOs.Vacation
{
    public class UsersDaysLeft
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IEnumerable<LeftVacationDaysDTO> daysLeft { get; set; }
    }
}