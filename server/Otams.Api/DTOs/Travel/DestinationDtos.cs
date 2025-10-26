using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Otams.Api.DTOs.Travel
{
    public class DestinationDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal PriceFrom { get; set; }

        public List<string>? Images { get; set; }

        public string? Category { get; set; }
        public string? Tags { get; set; }
        public double AverageRating { get; set; }
        public int Popularity { get; set; }
    }

    public class CreateDestinationRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal PriceFrom { get; set; }

        public List<IFormFile>? Images { get; set; }

        public string? Category { get; set; }
        public string? Tags { get; set; }
        public bool IsActive { get; set; }
    }

    public class UpdateDestinationRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal PriceFrom { get; set; }
        public string? Category { get; set; }
        public string? Tags { get; set; }

        public List<IFormFile>? NewImages { get; set; }

        public List<string>? ExistingImages { get; set; }

        public bool IsActive { get; set; }
    }
}
