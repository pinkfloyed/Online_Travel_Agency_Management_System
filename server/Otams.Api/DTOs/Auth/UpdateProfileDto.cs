using System.ComponentModel.DataAnnotations;
namespace Otams.Api.DTOs.Auth
{
    public class UpdateProfileDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}