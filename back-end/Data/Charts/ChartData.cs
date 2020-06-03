using System;
using System.Collections.Generic;

namespace back_end.Data
{
    public class ChartData
    {
        public string Title { get; set; }
        public string Key { get; set; }
        public string ChartType { get; set; }

        public Tuple<List<string>,List<int>> Data {get;set;}
    }
}