using System.Collections.Generic;
using Przychodnia.API;

namespace back_end.DTOs
{
    public class WorkScheduleReturn
    {
        //public int IdWorkSchedule { get; set; }
        public int IdUser { get; set; }
        public virtual ICollection<DayDTO> Day { get; set; }
    }
}