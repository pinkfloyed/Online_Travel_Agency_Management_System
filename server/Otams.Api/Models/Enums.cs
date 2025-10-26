namespace Otams.Api.Models
{
    public enum UserRole { Customer = 0, Admin = 1 }
    public enum BookingStatus { Pending = 0, Confirmed = 1, Cancelled = 2 }
    public enum PaymentStatus { Unpaid = 0, Paid = 1, Failed = 2 }
}
