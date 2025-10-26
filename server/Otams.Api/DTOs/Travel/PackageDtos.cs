namespace Otams.Api.DTOs.Travel
{
    public class PackageDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int DurationDays { get; set; }
        public int DestinationId { get; set; }

        public List<string>? Images { get; set; }
        public double AverageRating { get; set; }
        public int ReviewCount { get; set; }
        public string? Category { get; set; }
        public string? Tags { get; set; }
        public decimal? Discount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreatePackageRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int DurationDays { get; set; }
        public int DestinationId { get; set; }
        public IFormFile[] Images { get; set; } = Array.Empty<IFormFile>();
        public string Category { get; set; } = string.Empty;
        public string Tags { get; set; } = string.Empty;
        public int Discount { get; set; }
        public string? Inclusions { get; set; }
        public string? Exclusions { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? SlotsAvailable { get; set; }
        public bool? IsActive { get; set; }
    }

}

