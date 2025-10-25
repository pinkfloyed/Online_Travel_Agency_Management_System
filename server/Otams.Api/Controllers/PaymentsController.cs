using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Otams.Api.DTOs.Travel;
using Otams.Api.Services.Interfaces;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Otams.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        private Guid GetUserId()
        {
            // First try "sub"
            var userIdClaim = User.FindFirst("sub")?.Value 
                            ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                throw new UnauthorizedAccessException("User ID not found in token");

            return Guid.Parse(userIdClaim);
        }


        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> Pay([FromBody] CreatePaymentDto dto)
        {
            var result = await _paymentService.CreatePaymentAsync(dto);
            if (result == null) return NotFound("Booking not found.");
            return Ok(result);
        }

        [HttpGet("{bookingId}")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> GetByBooking(int bookingId)
        {
            var result = await _paymentService.GetPaymentByBookingAsync(bookingId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("my")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetMyPayments()
        {
            var userId = GetUserId();
            var result = await _paymentService.GetPaymentsByUserAsync(userId);
            if (!result.Any()) return NotFound("No payments found for this user.");
            return Ok(result);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _paymentService.GetAllPaymentsAsync();
            return Ok(result);
        }

        [HttpPost("confirm/{paymentId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ConfirmPayment(int paymentId)
        {
            var result = await _paymentService.ConfirmPaymentAsync(paymentId);
            if (result == null) return NotFound();
            return Ok(result);
        }
    }
}
