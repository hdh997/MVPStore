using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnboardTask_HuyHaDUc.Models
{
    public class MVPStoreDBContext : DbContext
    {
        //ctor
        public MVPStoreDBContext(DbContextOptions<MVPStoreDBContext> options):base(options)
        {

        }

        public DbSet<MVPCustomer> MVPCustomers { get; set; }
        public DbSet<MVPProduct> MVPProducts { get; set; }
        public DbSet<MVPStore> MVPStores { get; set; }
        public DbSet<MVPSales> MVPSales{ get; set; }

    }
}
