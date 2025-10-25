using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Otams.Api.DTOs.Travel;
using Otams.Api.Services;
using Otams.Api.Services.Interfaces;
using System.Threading.Tasks;

namespace Otams.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase
    {
        private readonly IDestinationService _service;

        public DestinationsController(IDestinationService service)
        {
            _service = service;
        }

        // GET all
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);
        }

        // GET by id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            var dest = await _service.GetByIdAsync(id);
            if (dest == null) return NotFound();
            return Ok(dest);
        }

        // POST create (Admin only)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] CreateDestinationRequest request)
        {
            var dest = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(Get), new { id = dest.Id }, dest);
        }

        // PUT update (Admin only)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateDestinationRequest request)
        {
            var dest = await _service.UpdateAsync(id, request);
            if (dest == null) return NotFound();
            return Ok(dest);
        }

        // DELETE (Admin only)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}

