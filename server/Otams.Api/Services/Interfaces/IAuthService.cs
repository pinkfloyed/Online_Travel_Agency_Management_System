using Otams.Api.DTOs.Auth;
using Otams.Api.Models;
using System.Threading.Tasks;

namespace Otams.Api.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto?> LoginAsync(LoginDto dto);
        Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken, string ip);
        Task RevokeTokenAsync(string refreshToken, string ip);
        Task<bool> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
        Task<User?> GetUserByIdAsync(string userId);
        Task<bool> UpdateUserProfileAsync(string userId, UpdateProfileDto dto);
        Task<bool> RevokeTokenByUserAsync(string userId, string ip);
    }
}
