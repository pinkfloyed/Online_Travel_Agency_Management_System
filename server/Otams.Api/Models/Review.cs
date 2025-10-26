using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Otams.Api.Models
{
    public class Review
    {
        public int Id { get; set; }

        public Guid UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        public int PackageId { get; set; }
        [JsonIgnore]
        public Package? Package { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(2000)]
        public string? Comment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}