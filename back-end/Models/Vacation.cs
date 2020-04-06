using System;
using System.Collections.Generic;

namespace Przychodnia.API
{
    public partial class Vacation
    {
        public int IdVacation { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int IdUserVac { get; set; }
        public int IdAbsenceVac { get; set; }

        public virtual Absence IdAbsenceVacNavigation { get; set; }
        public virtual User IdUserVacNavigation { get; set; }
    }
}
