﻿using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Entities.Enums;

namespace CashRegister.Data.Entities.Models
{
    public class ReceiptProduct
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public Guid ReceiptId { get; set; }
        public Receipt Receipt { get; set; }

        public TaxType TaxType { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
