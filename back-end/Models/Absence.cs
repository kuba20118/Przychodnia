using System;
using System.Collections.Generic;

namespace Przychodnia.API
{
    public partial class Absence
    {
        public Absence()
        {
            Leftvacationdays = new HashSet<Leftvacationdays>();
            Vacation = new HashSet<Vacation>();
            Vacationrequest = new HashSet<Vacationrequest>();
        }

        public int IdAbsence { get; set; }
        public string Name { get; set; }
        public int Limit { get; set; }

        public virtual ICollection<Leftvacationdays> Leftvacationdays { get; set; }
        public virtual ICollection<Vacation> Vacation { get; set; }
        public virtual ICollection<Vacationrequest> Vacationrequest { get; set; }
    }
}
