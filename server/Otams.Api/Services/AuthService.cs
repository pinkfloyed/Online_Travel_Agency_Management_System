using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Otams.Api.Data;
using Otams.Api.DTOs.Auth;
using Otams.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Otams.Api.Security;
using Otams.Api.Services.Interfaces;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Otams.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly JwtSettings _jwtSettings;
        private readonly PasswordHasher<User> _passwordHasher = new PasswordHasher<User>();

        public AuthService(AppDbContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<AuthResponseDto?> RegisterAsync(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return null;

            var user = new User
            {
                Name = dto.UserName,
                Email = dto.Email,
                Gender = dto.Gender,
                Role = Enum.TryParse<UserRole>(dto.Role, true, out var role) ? role : UserRole.Customer,
                CreatedAt = DateTime.UtcNow
            };
            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return await GenerateTokensAsync(user, "register");
        }

        public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null) return null;

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash!, dto.Password);
            if (result == PasswordVerificationResult.Failed) return null;

            return await GenerateTokensAsync(user, "login");
        }

        public async Task<AuthResponseDto?> RefreshTokenAsync(string refreshToken, string ip)
        {
            var storedToken = await _context.RefreshTokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Token == refreshToken);

            if (storedToken == null || !storedToken.IsActive) return null;

            storedToken.IsRevoked = true;
            storedToken.RevokedAt = DateTime.UtcNow;
            storedToken.RevokedByIp = ip;

            var user = storedToken.User!;
            return await GenerateTokensAsync(user, ip);
        }

        public async Task RevokeTokenAsync(string refreshToken, string ip)
        {
            var token = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);
            if (token != null && token.IsActive)
            {
                token.IsRevoked = true;
                token.RevokedAt = DateTime.UtcNow;
                token.RevokedByIp = ip;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ChangePasswordAsync(string userId, string currentPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            if (_passwordHasher.VerifyHashedPassword(user, user.PasswordHash!, currentPassword) == PasswordVerificationResult.Failed)
                return false;

            user.PasswordHash = _passwordHasher.HashPassword(user, newPassword);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User?> GetUserByIdAsync(string userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task<bool> UpdateUserProfileAsync(string userId, UpdateProfileDto dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            user.Name = dto.UserName ?? user.Name;
            user.Email = dto.Email ?? user.Email;
            user.Gender = dto.Gender ?? user.Gender;
            user.Role = Enum.TryParse<UserRole>(dto.Role, true, out var role) ? role : user.Role;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RevokeTokenByUserAsync(string userId, string ip)
        {
            var tokens = await _context.RefreshTokens
                .Where(t => t.UserId == userId && t.IsActive)
                .ToListAsync();
            if (!tokens.Any()) return false;

            tokens.ForEach(t =>
            {
                t.IsRevoked = true;
                t.RevokedAt = DateTime.UtcNow;
                t.RevokedByIp = ip;
            });

            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<AuthResponseDto> GenerateTokensAsync(User user, string ip)
        {
            // JWT claims
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Email ?? ""),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var accessExpiry = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpireMinutes);
            var accessToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: accessExpiry,
                signingCredentials: creds
            );
            var accessTokenStr = new JwtSecurityTokenHandler().WriteToken(accessToken);

            // Refresh token
            var refreshExpiry = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpirationDays);
            var refreshTokenStr = Convert.ToBase64String(Guid.NewGuid().ToByteArray()) + Guid.NewGuid().ToString();

            _context.RefreshTokens.Add(new RefreshToken
            {
                Token = refreshTokenStr,
                UserId = user.Id,
                ExpiresAt = refreshExpiry,
                CreatedByIp = ip
            });

            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                Id = user.Id,
                UserName = user.Name,
                Email = user.Email ?? "",
                Role = user.Role.ToString(),
                AccessToken = accessTokenStr,
                AccessTokenExpiresAt = accessExpiry,
                RefreshToken = refreshTokenStr,
                RefreshTokenExpiresAt = refreshExpiry
            };
        }
    }
}
