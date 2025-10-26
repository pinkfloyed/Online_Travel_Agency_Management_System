using Microsoft.EntityFrameworkCore;
using Otams.Api.Data;
using Otams.Api.DTOs.Travel;
using Otams.Api.Models;
using Otams.Api.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Otams.Api.Services
{
    public class ReviewService : IReviewService
    {
        private readonly AppDbContext _db;

        public ReviewService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<ReviewResponseDto> AddReviewAsync(Guid userId, CreateReviewRequest dto)
        {
            var review = new Review
            {
                PackageId = dto.PackageId,
                UserId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment
            };

            _db.Reviews.Add(review);
            await _db.SaveChangesAsync();

            return MapToDto(review);
        }

        public async Task<IEnumerable<ReviewResponseDto>> GetByPackageAsync(int packageId)
        {
            var reviews = await _db.Reviews
                .Where(r => r.PackageId == packageId)
                .ToListAsync();

            return reviews.Select(MapToDto);
        }

        public async Task<IEnumerable<ReviewResponseDto>> GetByUserAsync(Guid userId)
        {
            var reviews = await _db.Reviews
                .Where(r => r.UserId == userId)
                .ToListAsync();

            return reviews.Select(MapToDto);
        }

        public async Task<IEnumerable<ReviewResponseDto>> GetAllReviewsAsync()
        {
            var reviews = await _db.Reviews.ToListAsync();
            return reviews.Select(MapToDto);
        }

        private ReviewResponseDto MapToDto(Review r) => new ReviewResponseDto
        {
            Id = r.Id,
            PackageId = r.PackageId,
            UserId = r.UserId,
            Rating = r.Rating,
            Comment = r.Comment ?? string.Empty,
            CreatedAt = r.CreatedAt
        };
    }
}
