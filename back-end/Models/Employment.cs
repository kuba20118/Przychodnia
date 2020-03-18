using System;
using System.Collections.Generic;

namespace Przychodnia.API
{
    public partial class Employment
    {
        public Employment()
        {
            User = new HashSet<User>();
        }

        public int IdEmployment { get; set; }
        public int? WorkingHours { get; set; }
        public sbyte? CurrentyEmployed { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? FireDate { get; set; }

        public virtual ICollection<User> User { get; set; }
    }
}
