using CalculateVAT.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CalculateVAT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VatController : ControllerBase
    {
        private readonly IVatRepository _vatRepository;

        public VatController(IVatRepository vatRepository)
        {
            _vatRepository = vatRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var response = _vatRepository.GetAll();

            return Ok(response);
        }
    }
}