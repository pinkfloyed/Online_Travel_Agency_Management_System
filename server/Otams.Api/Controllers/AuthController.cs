using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Otams.Api.DTOs.Auth;
using Otams.Api.Models;
using Otams.Api.Services.Interfaces;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Otams.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(dto);
            if (result == null)
                return BadRequest(new { message = "Email already exists" });

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.LoginAsync(dto);
            if (result == null)
                return Unauthorized(new { message = "Invalid email or password" });

            return Ok(result);
        }

        [HttpPost("refresh")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
        {
            if (string.IsNullOrEmpty(dto.RefreshToken))
                return BadRequest(new { message = "Refresh token required" });

            var tokenResult = await _authService.RefreshTokenAsync(
                dto.RefreshToken,
                HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
            );

            if (tokenResult == null)
                return Unauthorized(new { message = "Invalid or expired refresh token" });

            return Ok(tokenResult);
        }

        [HttpPost("logout")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> Logout([FromBody] RefreshRequestDto dto)
        {
            if (string.IsNullOrEmpty(dto.RefreshToken))
                return BadRequest(new { message = "Refresh token required" });

            await _authService.RevokeTokenAsync(
                dto.RefreshToken,
                HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
            );

            Response.Cookies.Delete("refreshToken");
            return Ok(new { message = "Logged out successfully" });
        }

        [HttpPost("change-password")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            var result = await _authService.ChangePasswordAsync(userIdClaim, dto.CurrentPassword, dto.NewPassword);
            if (!result)
                return BadRequest(new { message = "Current password is incorrect" });

            return Ok(new { message = "Password changed successfully" });
        }

        [HttpGet("profile")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            var user = await _authService.GetUserByIdAsync(userIdClaim);
            if (user == null)
                return NotFound();

            return Ok(new
            {
                Id = user.Id,
                UserName = user.Name,
                Email = user.Email,
                Gender = user.Gender,
                Role = user.Role.ToString(),
                CreatedAt = user.CreatedAt
            });
        }

        [HttpPut("profile")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            var result = await _authService.UpdateUserProfileAsync(userIdClaim, dto);
            if (!result)
                return NotFound();

            return Ok(new { message = "Profile updated successfully" });
        }

        [HttpPost("revoke-all")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> RevokeAllTokens()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            var result = await _authService.RevokeTokenByUserAsync(
                userIdClaim,
                HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
            );

            if (!result)
                return NotFound(new { message = "No active tokens found" });

            Response.Cookies.Delete("refreshToken");
            return Ok(new { message = "All refresh tokens revoked" });
        }
    }
}

