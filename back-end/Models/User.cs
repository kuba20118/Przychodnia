using System;
using System.Collections.Generic;

namespace Przychodnia.API
{
    public partial class User
    {
        public User()
        {
            Leftvacationdays = new HashSet<Leftvacationdays>();
            Vacation = new HashSet<Vacation>();
            Workschedule = new HashSet<Workschedule>();
        }

        public int IdUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
        public string Hash { get; set; }
        public string Salt { get; set; }
        public int? IdRole { get; set; }
        public int? IdEmpl { get; set; }

        public virtual Employment IdEmplNavigation { get; set; }
        public virtual Role IdRoleNavigation { get; set; }
        public virtual ICollection<Leftvacationdays> Leftvacationdays { get; set; }
        public virtual ICollection<Vacation> Vacation { get; set; }
        public virtual ICollection<Workschedule> Workschedule { get; set; }
    }
}
