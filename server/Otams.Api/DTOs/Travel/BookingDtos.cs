using System;
using System.ComponentModel.DataAnnotations;

namespace Otams.Api.DTOs.Travel
{
    public class BookingDtos
    {
        public int Id { get; set; }
        public int? PackageId { get; set; }
        public int? DestinationId { get; set; }
        public Guid UserId { get; set; }
        public string? PackageName { get; set; }
        public string? DestinationName { get; set; }

        public DateTime BookingDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Status { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }

        public int Travelers { get; set; } = 1;
        public decimal Discount { get; set; } = 0;
        public string? SpecialRequests { get; set; }
    }

    public class CreateBookingDto
    {
        public int? PackageId { get; set; }
        public int? DestinationId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Range(0, double.MaxValue)]
        public decimal TotalPrice { get; set; }

        [Range(1, int.MaxValue)]
        public int Travelers { get; set; } = 1;

        [Range(0, double.MaxValue)]
        public decimal Discount { get; set; } = 0;

        public string? SpecialRequests { get; set; }
    }

    public class UpdateBookingStatusDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;
    }
}
