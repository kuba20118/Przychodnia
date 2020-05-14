using System;

namespace back_end.DTOs.Vacation
{
    public class NewVacationRequestDTO
    {
        
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Reason { get; set; }
        public int IdAbsence { get; set; }
    }
}