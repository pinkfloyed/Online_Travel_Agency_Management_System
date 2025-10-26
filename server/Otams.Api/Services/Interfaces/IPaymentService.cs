using Otams.Api.DTOs.Travel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Otams.Api.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentResponseDto> CreatePaymentAsync(CreatePaymentDto dto);
        Task<PaymentResponseDto> GetPaymentByBookingAsync(int bookingId);
        Task<IEnumerable<PaymentResponseDto>> GetPaymentsByUserAsync(Guid userId);
        Task<IEnumerable<PaymentResponseDto>> GetAllPaymentsAsync();
        Task<PaymentResponseDto> ConfirmPaymentAsync(int paymentId);
    }
}
