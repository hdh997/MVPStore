using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnboardTask_HuyHaDUc.Models
{
    public class MVPProduct
    {
        [Key]
        public int productID { get; set; }
        
        [Column(TypeName = "nvarchar(100)")]
        public string name { get; set; }

        public decimal price { get; set; }
    }
}
