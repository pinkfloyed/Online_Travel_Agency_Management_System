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
    public class BookingService : IBookingService
    {
        private readonly AppDbContext _context;

        public BookingService(AppDbContext context)
        {
            _context = context;
        }

        // ---------------- CUSTOMER ----------------

        public async Task<BookingDtos> CreateBookingAsync(CreateBookingDto dto, Guid userId)
        {
            if (dto.StartDate >= dto.EndDate)
                throw new ArgumentException("StartDate must be before EndDate.");

            if (!dto.PackageId.HasValue && !dto.DestinationId.HasValue)
                throw new ArgumentException("PackageId or DestinationId must be provided.");

            var booking = new Booking
            {
                UserId = userId,
                PackageId = dto.PackageId,
                DestinationId = dto.DestinationId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                TotalPrice = dto.TotalPrice,
                Travelers = dto.Travelers,
                Discount = dto.Discount,
                SpecialRequests = dto.SpecialRequests,
                Status = BookingStatus.Pending
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return await MapToDtoAsync(booking);
        }

        public async Task<IEnumerable<BookingDtos>> GetUserBookingsAsync(Guid userId)
        {
            var bookings = await _context.Bookings
                .Include(b => b.Package)
                .Include(b => b.Destination)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            return bookings.Select(MapToDto);
        }

        public async Task<BookingDtos?> UpdateBookingAsync(int bookingId, Guid userId, CreateBookingDto dto)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId && b.UserId == userId);
            if (booking == null) return null;

            booking.StartDate = dto.StartDate;
            booking.EndDate = dto.EndDate;
            booking.TotalPrice = dto.TotalPrice;
            booking.Travelers = dto.Travelers;
            booking.Discount = dto.Discount;
            booking.SpecialRequests = dto.SpecialRequests;
            booking.PackageId = dto.PackageId;
            booking.DestinationId = dto.DestinationId;

            await _context.SaveChangesAsync();
            return await MapToDtoAsync(booking);
        }

        public async Task<bool> DeleteBookingAsync(int bookingId, Guid userId)
        {
            var booking = await _context.Bookings
                .FirstOrDefaultAsync(b => b.Id == bookingId && b.UserId == userId);

            if (booking == null)
                return false;

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }

        // ---------------- ADMIN ----------------

        public async Task<IEnumerable<BookingDtos>> GetAllBookingsAsync()
        {
            var bookings = await _context.Bookings
                .Include(b => b.Package)
                .Include(b => b.Destination)
                .Include(b => b.User)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            return bookings.Select(MapToDto);
        }

        public async Task<BookingDtos?> GetBookingByIdAsync(int bookingId)
        {
            var booking = await _context.Bookings
                .Include(b => b.Package)
                .Include(b => b.Destination)
                .Include(b => b.User)
                .FirstOrDefaultAsync(b => b.Id == bookingId);
            return booking == null ? null : MapToDto(booking);
        }

        public async Task<BookingDtos?> UpdateBookingStatusAsync(int bookingId, string status)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null) return null;

            if (!Enum.TryParse<BookingStatus>(status, true, out var parsed))
                throw new ArgumentException("Invalid booking status.");

            booking.Status = parsed;
            await _context.SaveChangesAsync();
            return await MapToDtoAsync(booking);
        }

        public async Task<bool> AdminDeleteBookingAsync(int bookingId)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId);

            if (booking == null)
                return false;

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }

        // ---------------- MAPPER ----------------

        private BookingDtos MapToDto(Booking booking)
        {
            return new BookingDtos
            {
                Id = booking.Id,
                PackageId = booking.PackageId,
                DestinationId = booking.DestinationId,
                UserId = booking.UserId,
                PackageName = booking.Package?.Title,
                DestinationName = booking.Destination?.Name,
                BookingDate = booking.CreatedAt,
                StartDate = booking.StartDate,
                EndDate = booking.EndDate,
                Status = booking.Status.ToString(),
                TotalPrice = booking.TotalPrice,
                Travelers = booking.Travelers,
                Discount = booking.Discount,
                SpecialRequests = booking.SpecialRequests
            };
        }

        private async Task<BookingDtos> MapToDtoAsync(Booking booking)
        {
            await _context.Entry(booking).Reference(b => b.Package).LoadAsync();
            await _context.Entry(booking).Reference(b => b.Destination).LoadAsync();
            return MapToDto(booking);
        }
    }
}
