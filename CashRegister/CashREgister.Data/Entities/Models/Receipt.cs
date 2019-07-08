using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class Receipt
    {
        public Guid Id { get; set; }
        public int CashierId { get; set; }
        public Cashier Cashier { get; set; }
        public int RegisterId { get; set; }
        public Register Register { get; set; }
        public ICollection<ReceiptProduct> ReceiptProducts { get; set; }
    }
}
