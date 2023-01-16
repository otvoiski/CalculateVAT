using CalculateVAT.Models;
using Microsoft.EntityFrameworkCore;

namespace CalculateVAT.Repository
{
    public class VatRepository : IVatRepository
    {
        private readonly IVatContext _context;

        public VatRepository(IVatContext context)
        {
            _context = context;
        }

        public IEnumerable<VatCountry> GetAll()
        {
            var results = _context.Vats.Include("Vats").AsEnumerable();

            if (results == null)
                results = Enumerable.Empty<VatCountry>();

            return results;
        }
    }

    public interface IVatRepository
    {
        IEnumerable<VatCountry> GetAll();
    }
}