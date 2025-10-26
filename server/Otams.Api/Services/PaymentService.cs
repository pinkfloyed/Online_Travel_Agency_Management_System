using Microsoft.EntityFrameworkCore;
using Otams.Api.Data;
using Otams.Api.DTOs.Travel;
using Otams.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Otams.Api.Services.Interfaces;

namespace Otams.Api.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _db;

        public PaymentService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<PaymentResponseDto> CreatePaymentAsync(CreatePaymentDto dto)
        {
            var booking = await _db.Bookings.FindAsync(dto.BookingId);
            if (booking == null) return null!;

            var payment = new Payment
            {
                BookingId = dto.BookingId,
                Amount = dto.Amount,
                Method = dto.Method,
                Status = PaymentStatus.Unpaid
            };

            _db.Payments.Add(payment);
            await _db.SaveChangesAsync();

            return MapToDto(payment, booking.UserId);
        }

        public async Task<PaymentResponseDto> GetPaymentByBookingAsync(int bookingId)
        {
            var payment = await _db.Payments
                .Include(p => p.Booking)
                .FirstOrDefaultAsync(p => p.BookingId == bookingId);

            if (payment == null) return null!;

            return MapToDto(payment, payment.Booking!.UserId);
        }

        public async Task<IEnumerable<PaymentResponseDto>> GetPaymentsByUserAsync(Guid userId)
        {
            var payments = await _db.Payments
                .Include(p => p.Booking)
                .Where(p => p.Booking != null && p.Booking.UserId == userId)
                .ToListAsync();

            return payments.Select(p => MapToDto(p, p.Booking!.UserId));
        }

        public async Task<IEnumerable<PaymentResponseDto>> GetAllPaymentsAsync()
        {
            var payments = await _db.Payments
                .Include(p => p.Booking)
                .ToListAsync();

            return payments.Select(p => MapToDto(p, p.Booking!.UserId));
        }

        public async Task<PaymentResponseDto> ConfirmPaymentAsync(int paymentId)
        {
            var payment = await _db.Payments
                .Include(p => p.Booking)
                .FirstOrDefaultAsync(p => p.Id == paymentId);

            if (payment == null) return null!;

            payment.Status = PaymentStatus.Paid;
            await _db.SaveChangesAsync();

            return MapToDto(payment, payment.Booking!.UserId);
        }

        private PaymentResponseDto MapToDto(Payment p, Guid userId) => new PaymentResponseDto
        {
            Id = p.Id,
            BookingId = p.BookingId,
            UserId = userId,
            Amount = p.Amount,
            Method = p.Method,
            Status = p.Status.ToString(),
            CreatedAt = p.CreatedAt
        };
    }
}
