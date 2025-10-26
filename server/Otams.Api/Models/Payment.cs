using System.Text.Json.Serialization;

namespace Otams.Api.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public int BookingId { get; set; }

        [JsonIgnore]
        public Booking? Booking { get; set; }

        public decimal Amount { get; set; }

        public string Method { get; set; } = "card";

        public PaymentStatus Status { get; set; } = PaymentStatus.Unpaid;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
