using Otams.Api.DTOs.Travel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Otams.Api.Services.Interfaces
{
    public interface IDestinationService
    {
        Task<IEnumerable<DestinationDto>> GetAllAsync();
        Task<DestinationDto?> GetByIdAsync(int id);
        Task<DestinationDto> CreateAsync(CreateDestinationRequest request);
        Task<DestinationDto?> UpdateAsync(int id, UpdateDestinationRequest request);
        Task<bool> DeleteAsync(int id);
    }
}
