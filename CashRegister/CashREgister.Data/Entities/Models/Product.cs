using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using CashRegister.Data.Entities.Enums;

namespace CashRegister.Data.Entities.Models
{
    public class Product
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public ICollection<ReceiptProduct> ReceiptProducts { get; set; }

        public string Barcode { get; set; }
        public string Name { get; set; }
        public double PriceWithTax { get; set; }
        public TaxType Type { get; set; }
        public int AvailableAmount { get; set; }
    }
}
