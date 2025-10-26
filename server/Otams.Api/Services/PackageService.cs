using Microsoft.EntityFrameworkCore;
using Otams.Api.Data;
using Otams.Api.DTOs.Travel;
using Otams.Api.Models;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Otams.Api.Services.Interfaces;

namespace Otams.Api.Services
{
    public class PackageService : IPackageService
    {
        private readonly AppDbContext _db;
        private readonly IWebHostEnvironment _env;

        public PackageService(AppDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        public async Task<IEnumerable<PackageDto>> GetAllPackagesAsync()
        {
            var packages = await _db.Packages.Include(p => p.Destination).ToListAsync();

            return packages.Select(p => MapToDto(p));
        }

        public async Task<PackageDto?> GetPackageByIdAsync(int id)
        {
            var package = await _db.Packages.Include(p => p.Destination)
                                            .FirstOrDefaultAsync(p => p.Id == id);
            return package == null ? null : MapToDto(package);
        }

        public async Task<Package?> CreatePackageAsync(CreatePackageRequest dto)
        {
            if (!await _db.Destinations.AnyAsync(d => d.Id == dto.DestinationId))
                return null;

            var imageUrls = await SaveImagesAsync(dto.Images);

            var package = new Package
            {
                Title = dto.Title,
                Description = dto.Description,
                Price = dto.Price,
                DurationDays = dto.DurationDays,
                DestinationId = dto.DestinationId,
                Images = imageUrls,
                Category = dto.Category,
                Tags = dto.Tags,
                Discount = dto.Discount,
                Inclusions = dto.Inclusions,
                Exclusions = dto.Exclusions,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                SlotsAvailable = dto.SlotsAvailable ?? 20,
                IsActive = dto.IsActive ?? true
            };

            await _db.Packages.AddAsync(package);
            await _db.SaveChangesAsync();

            return package;
        }

        public async Task<Package?> UpdatePackageAsync(int id, CreatePackageRequest dto)
        {
            var package = await _db.Packages.FindAsync(id);
            if (package == null || !await _db.Destinations.AnyAsync(d => d.Id == dto.DestinationId))
                return null;

            if (dto.Images.Any())
            {
                var imageUrls = await SaveImagesAsync(dto.Images);
                package.Images = imageUrls;
            }

            package.Title = dto.Title;
            package.Description = dto.Description;
            package.Price = dto.Price;
            package.DurationDays = dto.DurationDays;
            package.DestinationId = dto.DestinationId;
            package.Category = dto.Category;
            package.Tags = dto.Tags;
            package.Discount = dto.Discount;
            package.Inclusions = dto.Inclusions;
            package.Exclusions = dto.Exclusions;
            package.StartDate = dto.StartDate;
            package.EndDate = dto.EndDate;
            package.SlotsAvailable = dto.SlotsAvailable ?? package.SlotsAvailable;
            package.IsActive = dto.IsActive ?? package.IsActive;

            await _db.SaveChangesAsync();

            return package;
        }

        public async Task<bool> DeletePackageAsync(int id)
        {
            var package = await _db.Packages.FindAsync(id);
            if (package == null) return false;

            _db.Packages.Remove(package);
            await _db.SaveChangesAsync();
            return true;
        }

        private async Task<List<string>> SaveImagesAsync(IEnumerable<IFormFile> files)
        {
            var imageUrls = new List<string>();
            if (!files.Any()) return imageUrls;

            var imagesPath = Path.Combine(_env.WebRootPath ?? "wwwroot", "images/packages");
            Directory.CreateDirectory(imagesPath);

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(imagesPath, fileName);
                    using var stream = System.IO.File.Create(filePath);
                    await file.CopyToAsync(stream);

                    var url = $"/images/packages/{fileName}";
                    imageUrls.Add(url);
                }
            }

            return imageUrls;
        }

        private PackageDto MapToDto(Package p) => new PackageDto
        {
            Id = p.Id,
            Title = p.Title,
            Description = p.Description,
            Price = p.Price,
            DurationDays = p.DurationDays,
            DestinationId = p.DestinationId,
            Images = p.Images,
            Category = p.Category,
            Tags = p.Tags,
            Discount = p.Discount,
            AverageRating = p.AverageRating,
            ReviewCount = p.ReviewCount,
            CreatedAt = p.CreatedAt,
            UpdatedAt = p.UpdatedAt
        };
    }
}
