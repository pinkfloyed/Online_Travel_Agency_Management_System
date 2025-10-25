using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Otams.Api.DTOs.Travel;
using Otams.Api.Services.Interfaces;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Otams.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Customer,Admin")]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        private Guid GetUserId()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type.EndsWith("nameidentifier"));
            if (userIdClaim == null) throw new UnauthorizedAccessException();
            return Guid.Parse(userIdClaim.Value);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateReviewRequest dto)
        {
            var userId = GetUserId();
            var result = await _reviewService.AddReviewAsync(userId, dto);
            return Ok(result);
        }

        [HttpGet("package/{packageId}")]
        public async Task<IActionResult> GetByPackage(int packageId)
        {
            var result = await _reviewService.GetByPackageAsync(packageId);
            return Ok(result);
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyReviews()
        {
            var userId = GetUserId();
            var result = await _reviewService.GetByUserAsync(userId);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllReviews()
        {
            var result = await _reviewService.GetAllReviewsAsync();
            return Ok(result);
        }
    }
}
