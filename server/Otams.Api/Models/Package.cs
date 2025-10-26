using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Otams.Api.Models
{
    public class Package
    {
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public int DestinationId { get; set; }
        public Destination? Destination { get; set; }

        [Range(1, 365)]
        public int DurationDays { get; set; }

        [Range(0, 1000000)]
        public decimal Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public int SlotsAvailable { get; set; } = 20;
        public bool IsActive { get; set; } = true;

        [Column(TypeName = "text")]
        public string? Inclusions { get; set; }

        [Column(TypeName = "text")]
        public string? Exclusions { get; set; }


        [Column(TypeName = "json")]
        public List<string> Images { get; set; } = new();

        [Range(0, 5)]
        public double AverageRating { get; set; } = 0;

        public int ReviewCount { get; set; } = 0;

        [MaxLength(50)]
        public string? Category { get; set; }

        [Column(TypeName = "text")]
        public string? Tags { get; set; }

        [Range(0, 1000000)]
        public decimal? Discount { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
