using System;
using System.Collections.Generic;

namespace Przychodnia.API
{
    public partial class Day
    {
        public int IdDay { get; set; }
        public TimeSpan? FromTime { get; set; }
        public TimeSpan? ToTime { get; set; }
        public int IdWs { get; set; }

        public virtual Workschedule IdWsNavigation { get; set; }
    }
}
