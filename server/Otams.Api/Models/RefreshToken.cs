// Models/RefreshToken.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Otams.Api.Models
{


    public class RefreshToken
    {
        public int Id { get; set; }
        public string Token { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public bool IsRevoked { get; set; } = false;
        public string CreatedByIp { get; set; } = string.Empty;
        public string? RevokedByIp { get; set; }
        public DateTime? RevokedAt { get; set; }

        public User? User { get; set; }
        public bool IsActive => !IsRevoked && DateTime.UtcNow <= ExpiresAt;
    }

}

