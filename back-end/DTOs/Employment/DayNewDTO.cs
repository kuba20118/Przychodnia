using System;

namespace back_end.DTOs.Employment
{
    public class DayNewDTO
    {
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }

        public string Type { get; set; }
    }
}