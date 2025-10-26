using Otams.Api.DTOs.Travel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Otams.Api.Services.Interfaces
{
    public interface IReviewService
    {
        Task<ReviewResponseDto> AddReviewAsync(Guid userId, CreateReviewRequest dto);
        Task<IEnumerable<ReviewResponseDto>> GetByPackageAsync(int packageId);
        Task<IEnumerable<ReviewResponseDto>> GetByUserAsync(Guid userId);
        Task<IEnumerable<ReviewResponseDto>> GetAllReviewsAsync();
    }
}
