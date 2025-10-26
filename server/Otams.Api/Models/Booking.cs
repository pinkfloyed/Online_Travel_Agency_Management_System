using System;

namespace Otams.Api.Models
{
    public class Booking
    {
        public int Id { get; set; }

        public Guid UserId { get; set; }
        public User? User { get; set; }

        public int? PackageId { get; set; }
        public Package? Package { get; set; }

        public int? DestinationId { get; set; }
        public Destination? Destination { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public decimal TotalPrice { get; set; }
        public int Travelers { get; set; } = 1;
        public decimal Discount { get; set; } = 0;
        public string? SpecialRequests { get; set; }

        public BookingStatus Status { get; set; } = BookingStatus.Pending;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
