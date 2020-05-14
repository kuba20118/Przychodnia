using System;
using System.Collections.Generic;

namespace Przychodnia.API
{
    public partial class Vacationrequest
    {
        public int IdRequest { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Reason { get; set; }
        public int IdAbsence { get; set; }
        public int IdUser { get; set; }

        public virtual Absence IdAbsenceNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}
