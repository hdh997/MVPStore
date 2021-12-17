using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnboardTask_HuyHaDUc.Models
{
    public class MVPSales
    {
        [Key]
        public int id { get; set; }

        public int customerID { get; set; }
        public MVPCustomer customer { get; set; }

        public int storeID{ get; set; }
        public MVPStore store { get; set; }

        public int productID { get; set; }
        public MVPProduct product { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string dateSold { get; set; }
    }
}
