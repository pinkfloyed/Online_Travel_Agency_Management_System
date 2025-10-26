using System.ComponentModel.DataAnnotations;
namespace Otams.Api.DTOs.Auth
{
    public class RegisterDto
    {
        [Required, MaxLength(100)]
        public string UserName { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8)]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public string Gender { get; set; } = string.Empty;

        public string Role { get; set; } = "Customer";
    }

}