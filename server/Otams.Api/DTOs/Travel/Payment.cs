namespace Otams.Api.DTOs.Travel
{
    public class CreatePaymentDto
    {
        public int BookingId { get; set; }
        public decimal Amount { get; set; }
        public string Method { get; set; } = "card";
    }

    public class PaymentResponseDto
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public Guid? UserId { get; set; }
        public decimal Amount { get; set; }
        public string? Method { get; set; }
        public string? Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
