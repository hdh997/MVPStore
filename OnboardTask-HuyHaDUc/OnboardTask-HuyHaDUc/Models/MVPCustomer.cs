using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnboardTask_HuyHaDUc.Models
{
    public class MVPCustomer
    {
        [Key]
        public int customerID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string name { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string address { get; set; }
    }
}
