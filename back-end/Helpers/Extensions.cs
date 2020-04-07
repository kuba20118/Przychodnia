using System;

namespace back_end.Helpers
{
    public static class Extensions
    {
        public static bool IsBewteenTwoDates(this DateTime dt, DateTime start, DateTime end)
        {
            return dt.DayOfYear >= start.DayOfYear && dt.DayOfYear <= end.DayOfYear;
        }
    }
}