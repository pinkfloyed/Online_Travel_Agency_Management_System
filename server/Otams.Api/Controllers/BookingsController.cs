using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Otams.Api.DTOs.Travel;
using Otams.Api.Services.Interfaces;
using System.Security.Claims;

namespace Otams.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // -------------------- CUSTOMER --------------------

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var booking = await _bookingService.CreateBookingAsync(dto, userId);
            return Ok(booking);
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyBookings()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var bookings = await _bookingService.GetUserBookingsAsync(userId);
            return Ok(bookings);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMyBooking(int id, [FromBody] CreateBookingDto dto)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var updated = await _bookingService.UpdateBookingAsync(id, userId, dto);

            if (updated == null)
                return NotFound(new { message = "Booking not found or unauthorized." });

            return Ok(updated);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var success = await _bookingService.DeleteBookingAsync(id, userId);
            if (!success)
                return NotFound(new { message = "Booking not found or not authorized to delete." });

            return NoContent(); // 204
        }

        // -------------------- ADMIN --------------------

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            return Ok(bookings);
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetBookingsByUser(Guid userId)
        {
            var bookings = await _bookingService.GetUserBookingsAsync(userId);
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetBookingById(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null) return NotFound();
            return Ok(booking);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateBookingStatusDto dto)
        {
            var booking = await _bookingService.UpdateBookingStatusAsync(id, dto.Status);
            if (booking == null) return NotFound(new { message = "Booking not found." });
            return Ok(booking);
        }

        [HttpDelete("{id}/admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AdminDeleteBooking(int id)
        {
            var success = await _bookingService.AdminDeleteBookingAsync(id);
            if (!success)
                return NotFound(new { message = "Booking not found." });

            return NoContent(); // 204
        }
    }
}

