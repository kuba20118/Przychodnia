using System;

namespace back_end.DTOs
{
    public class NewVacationDTO
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int UserForReplacentId { get; set; }
        public int IdAbsence { get; set; }

    }
}