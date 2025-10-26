using System.ComponentModel.DataAnnotations;

namespace Otams.Api.DTOs.Auth
{
    public class LoginDto
    {

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty;
    }
}