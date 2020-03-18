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
        }


        public int IdAbsence { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Leftvacationdays> Leftvacationdays { get; set; }
        public virtual ICollection<Vacation> Vacation { get; set; }
    }
}
