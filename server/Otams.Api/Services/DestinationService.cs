using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Otams.Api.Data;
using Otams.Api.DTOs.Travel;
using Otams.Api.Models;
using Otams.Api.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Otams.Api.Services
{
    public class DestinationService : IDestinationService
    {
        private readonly AppDbContext _db;
        private readonly IWebHostEnvironment _env;

        public DestinationService(AppDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        public async Task<IEnumerable<DestinationDto>> GetAllAsync()
        {
            var destinations = await _db.Destinations.ToListAsync();
            return destinations.Select(d => MapToDto(d));
        }

        public async Task<DestinationDto?> GetByIdAsync(int id)
        {
            var dest = await _db.Destinations.FindAsync(id);
            return dest == null ? null : MapToDto(dest);
        }

        public async Task<DestinationDto> CreateAsync(CreateDestinationRequest request)
        {
            var imageUrls = await SaveImagesAsync(request.Images);

            var destination = new Destination
            {
                Name = request.Name,
                Country = request.Country,
                City = request.City,
                Description = request.Description,
                PriceFrom = request.PriceFrom,
                Category = request.Category,
                Tags = request.Tags,
                IsActive = request.IsActive,
                Images = imageUrls
            };

            _db.Destinations.Add(destination);
            await _db.SaveChangesAsync();

            return MapToDto(destination);
        }

        public async Task<DestinationDto?> UpdateAsync(int id, UpdateDestinationRequest request)
        {
            var dest = await _db.Destinations.FindAsync(id);
            if (dest == null) return null;

            dest.Name = request.Name;
            dest.Country = request.Country;
            dest.City = request.City;
            dest.Description = request.Description;
            dest.PriceFrom = request.PriceFrom;
            dest.Category = request.Category;
            dest.Tags = request.Tags;
            dest.IsActive = request.IsActive;
            var imageUrls = request.ExistingImages?.ToList() ?? new List<string>();
            var newImages = await SaveImagesAsync(request.NewImages);
            imageUrls.AddRange(newImages);
            dest.Images = imageUrls;

            await _db.SaveChangesAsync();

            return MapToDto(dest);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var dest = await _db.Destinations.FindAsync(id);
            if (dest == null) return false;

            _db.Destinations.Remove(dest);
            await _db.SaveChangesAsync();
            return true;
        }

        private async Task<List<string>> SaveImagesAsync(IEnumerable<IFormFile>? files)
        {
            var imageUrls = new List<string>();
            if (files == null || !files.Any()) return imageUrls;

            var folderPath = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", "destinations");
            Directory.CreateDirectory(folderPath);

            foreach (var file in files)
            {
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                var filePath = Path.Combine(folderPath, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);

                imageUrls.Add($"/uploads/destinations/{fileName}");
            }

            return imageUrls;
        }

        private DestinationDto MapToDto(Destination d) => new DestinationDto
        {
            Id = d.Id,
            Name = d.Name,
            Country = d.Country,
            City = d.City,
            Description = d.Description,
            PriceFrom = d.PriceFrom,
            Category = d.Category,
            Tags = d.Tags,
            AverageRating = d.AverageRating,
            Popularity = d.Popularity,
            Images = d.Images
        };
    }
}
