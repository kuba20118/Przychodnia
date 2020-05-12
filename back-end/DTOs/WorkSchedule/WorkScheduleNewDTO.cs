using System.Collections.Generic;

namespace back_end.DTOs.Employment
{
    public class WorkScheduleNewDTO
    {
        public int NumberOfWeeks { get; set; }
        public virtual ICollection<DayNewDTO> Day { get; set; }

    }
}