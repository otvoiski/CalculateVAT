using CalculateVAT.Data;
using CalculateVAT.Models;
using Microsoft.AspNetCore.Mvc;

namespace CalculateVAT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VatController : ControllerBase
    {
        [HttpGet]
        public IList<VATDataModel> Get()
        {
            return DataBaseItems.GetVatData();
        }
    }
}