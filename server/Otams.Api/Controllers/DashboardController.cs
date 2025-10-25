using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Otams.Api.Data;
using Otams.Api.Models;
using System.Threading.Tasks;
using System.Linq;

namespace Otams.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")] 
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DashboardController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardStats()
        {
            // Total counts
            var totalBookings = await _db.Bookings.CountAsync();
            var totalPackages = await _db.Packages.CountAsync();
            var totalDestinations = await _db.Destinations.CountAsync();
            var totalUsers = await _db.Users.CountAsync();
            var totalPayments = await _db.Payments.CountAsync();
            var totalPaidPayments = await _db.Payments.CountAsync(p => p.Status == PaymentStatus.Paid);

            // Bookings per status
            var bookingsStatus = await _db.Bookings
                .GroupBy(b => b.Status)
                .Select(g => new { Status = g.Key.ToString(), Count = g.Count() })
                .ToListAsync();

            // Revenue summary
            var totalRevenue = await _db.Payments
                .Where(p => p.Status == PaymentStatus.Paid)
                .SumAsync(p => p.Amount);

            var unpaidRevenue = await _db.Payments
                .Where(p => p.Status == PaymentStatus.Unpaid)
                .SumAsync(p => p.Amount);

            // Average rating per package
            var packageRatings = await _db.Reviews
                .GroupBy(r => r.PackageId)
                .Select(g => new { PackageId = g.Key, AverageRating = g.Average(r => r.Rating) })
                .ToListAsync();

            var dashboard = new
            {
                TotalBookings = totalBookings,
                TotalPackages = totalPackages,
                TotalDestinations = totalDestinations,
                TotalUsers = totalUsers,
                TotalPayments = totalPayments,
                TotalPaidPayments = totalPaidPayments,
                BookingsPerStatus = bookingsStatus,
                TotalRevenue = totalRevenue,
                UnpaidRevenue = unpaidRevenue,
                PackageRatings = packageRatings
            };

            return Ok(dashboard);
        }
    }
}
