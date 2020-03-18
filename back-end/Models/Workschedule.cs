using System;
using System.Collections.Generic;

namespace Przychodnia.API
{
    public partial class Workschedule
    {
        public Workschedule()
        {
            Day = new HashSet<Day>();
        }

        public int IdWorkSchedule { get; set; }
        public sbyte? Current { get; set; }
        public int? WeekNumber { get; set; }
        public int? IdUser { get; set; }

        public virtual User IdUserNavigation { get; set; }
        public virtual ICollection<Day> Day { get; set; }
    }
}
