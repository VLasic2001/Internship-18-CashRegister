﻿using CashRegister.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        List<Receipt> GetAllReceipts();

        Guid? AddReceipt(Receipt receiptToAdd);

        Receipt GetReceiptById(Guid id);

        List<Receipt> GetReceiptsByDate(long date, int page);
    }
}
