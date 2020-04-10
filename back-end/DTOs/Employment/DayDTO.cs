using System;

namespace back_end.DTOs
{
    public class DayDTO
    {
        public int IdDay { get; set; }
        //public int DayOfYear { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }

        public string Type { get; set; }

    }
}