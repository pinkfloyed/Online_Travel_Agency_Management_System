using System.ComponentModel.DataAnnotations;

namespace Otams.Api.Models
{
    public class Destination
    {

        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Country { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string Description { get; set; }=string.Empty;

        public decimal PriceFrom { get; set; }


        public List<string> Images { get; set; } = new List<string>();


        [MaxLength(100)]
        public string? Category { get; set; }


        [MaxLength(250)]
        public string? Tags { get; set; }


        public double AverageRating { get; set; } = 0;


        public int Popularity { get; set; } = 0;

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        public List<Package> Packages { get; set; } = new();
        public List<Review> Reviews { get; set; } = new();

    }
}