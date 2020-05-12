using System;

namespace back_end.DTOs.WorkSchedule
{
    public class DayUpdateDTO
    {
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
        public string Type { get; set; }

    }
}