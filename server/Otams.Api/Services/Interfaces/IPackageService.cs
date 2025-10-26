using Otams.Api.DTOs.Travel;
using Otams.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Otams.Api.Services.Interfaces
{
    public interface IPackageService
    {
        Task<IEnumerable<PackageDto>> GetAllPackagesAsync();
        Task<PackageDto?> GetPackageByIdAsync(int id);
        Task<Package?> CreatePackageAsync(CreatePackageRequest dto);
        Task<Package?> UpdatePackageAsync(int id, CreatePackageRequest dto);
        Task<bool> DeletePackageAsync(int id);
    }
}
