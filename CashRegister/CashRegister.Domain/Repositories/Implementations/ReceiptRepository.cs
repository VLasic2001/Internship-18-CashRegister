﻿using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class ReceiptRepository : IReceiptRepository
    {
        public ReceiptRepository(CashRegisterContext context)
        {
            _context = context;
        }

        private readonly CashRegisterContext _context;

        public bool AddReceipt(Receipt receiptToAdd)
        {
            receiptToAdd.ReceiptProducts.ToList().ForEach(receiptProduct => 
                receiptProduct.Product = _context.Products.Find(receiptProduct.ProductId));
            var areProductsUnavailable = receiptToAdd.ReceiptProducts.Any(receiptProduct =>
                receiptProduct.Product.AvailableAmount < receiptProduct.Quantity);
            if (areProductsUnavailable)
                return false;

            receiptToAdd.ReceiptProducts.ToList().ForEach(receiptProduct =>
            {
                receiptProduct.Product.AvailableAmount -= receiptProduct.Quantity;
            });
            receiptToAdd.Cashier = _context.Cashiers.Find(receiptToAdd.CashierId);
            receiptToAdd.DateOfIssue = DateTime.Now;
            _context.Receipts.Add(receiptToAdd);
            _context.SaveChanges();
            return true;
        }

        public List<Receipt> GetAllReceipts()
        {
            return _context.Receipts.Include(r => r.Cashier).Include(r => r.ReceiptProducts).ThenInclude(rp => rp.Product).ToList();
        }

        public Receipt GetReceiptById(Guid id)
        {
            return _context.Receipts.Include(r => r.Cashier).Include(r => r.ReceiptProducts).ThenInclude(rp => rp.Product).First(receipt => receipt.Id == id);
        }

        public List<Receipt> GetReceiptsByDate(long date)
        {
            return _context.Receipts.Where(receipt => receipt.DateOfIssue >= (new DateTime(1970, 1, 1) + new TimeSpan(date * 10000))).Include(r => r.Cashier).Include(r => r.ReceiptProducts).ThenInclude(rp => rp.Product).ToList();
        }
    }
}
