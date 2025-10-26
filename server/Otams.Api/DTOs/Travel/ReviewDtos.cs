namespace Otams.Api.DTOs.Travel
{
    public class CreateReviewRequest
    {
        public int PackageId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }


    public class ReviewResponseDto
    {
        public int Id { get; set; }
        public int PackageId { get; set; }
        public Guid UserId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}

