using System;

namespace back_end.DTOs
{
    public class VacationDTO
    {
        public int IdUser { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string AbsenceType { get; set; }

    }
}