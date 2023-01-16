using CalculateVAT.Models;
using Microsoft.EntityFrameworkCore;

namespace CalculateVAT.Repository
{
    public class VatContext : DbContext, IVatContext
    {
        public VatContext(DbContextOptions<VatContext> options) : base(options)
        {
        }

        public DbSet<VatCountry> Vats
        {
            get; set;
        }
    }

    public interface IVatContext
    {
        public DbSet<VatCountry> Vats
        {
            get; set;
        }

        int SaveChanges();
    }
}