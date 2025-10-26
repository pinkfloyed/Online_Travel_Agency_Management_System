using Otams.Api.Controllers;

namespace Otams.Api.DTOs.Travel
{
    public class DashboardResponseDto
    {
        public int TotalBookings { get; set; }
        public int TotalPackages { get; set; }
        public int TotalDestinations { get; set; }
        public int TotalUsers { get; set; }
        public int TotalPayments { get; set; }
        public int TotalPaidPayments { get; set; }
        public IEnumerable<BookingStatusCount> BookingsPerStatus { get; set; } = new List<BookingStatusCount>();
        public decimal TotalRevenue { get; set; }
        public decimal UnpaidRevenue { get; set; }
        public IEnumerable<PackageRating> PackageRatings { get; set; } = new List<PackageRating>();
    }
    public class BookingStatusCount
    {
        public string Status { get; set; } = string.Empty;
        public int Count { get; set; }
    }

    public class PackageRating
    {
        public int PackageId { get; set; }
        public double AverageRating { get; set; }
    }
}