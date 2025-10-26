using Otams.Api.DTOs.Travel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Otams.Api.Services.Interfaces
{
    public interface IBookingService
    {
        // Customer
        Task<BookingDtos> CreateBookingAsync(CreateBookingDto dto, Guid userId);
        Task<IEnumerable<BookingDtos>> GetUserBookingsAsync(Guid userId);
        Task<BookingDtos?> UpdateBookingAsync(int bookingId, Guid userId, CreateBookingDto dto);
        Task<bool> DeleteBookingAsync(int bookingId, Guid userId);

        // Admin
        Task<IEnumerable<BookingDtos>> GetAllBookingsAsync();
        Task<BookingDtos?> GetBookingByIdAsync(int bookingId);
        Task<BookingDtos?> UpdateBookingStatusAsync(int bookingId, string status);
        Task<bool> AdminDeleteBookingAsync(int bookingId);
    }
}
