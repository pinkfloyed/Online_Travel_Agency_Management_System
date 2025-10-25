using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Otams.Api.DTOs.Travel;
using Otams.Api.Models;
using Otams.Api.Services.Interfaces;
using System.Threading.Tasks;

namespace Otams.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackagesController : ControllerBase
    {
        private readonly IPackageService _packageService;

        public PackagesController(IPackageService packageService)
        {
            _packageService = packageService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var packages = await _packageService.GetAllPackagesAsync();
            return Ok(packages);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            var package = await _packageService.GetPackageByIdAsync(id);
            if (package == null) return NotFound();
            return Ok(package);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] CreatePackageRequest dto)
        {
            var package = await _packageService.CreatePackageAsync(dto);
            if (package == null) return BadRequest("Invalid DestinationId.");
            return CreatedAtAction(nameof(Get), new { id = package.Id }, package);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromForm] CreatePackageRequest dto)
        {
            var package = await _packageService.UpdatePackageAsync(id, dto);
            if (package == null) return BadRequest("Invalid DestinationId or Package not found.");
            return Ok(package);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _packageService.DeletePackageAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
