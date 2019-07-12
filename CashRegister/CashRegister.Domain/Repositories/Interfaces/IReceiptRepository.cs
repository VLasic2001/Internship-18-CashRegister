using CashRegister.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        List<Receipt> GetAllReceipts();

        bool AddReceipt(Receipt receiptToAdd);

        Receipt GetReceiptById(Guid id);
    }
}
