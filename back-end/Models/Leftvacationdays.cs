using System;
using System.Collections.Generic;

namespace Przychodnia.API
{
    public partial class Leftvacationdays
    {
        public int IdlLeftVacationDays { get; set; }
        public int? LeftDays { get; set; }
        public int? IdUser { get; set; }
        public int? IdAbsence { get; set; }

        public virtual Absence IdAbsenceNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}
