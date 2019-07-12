using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class Receipt
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }

        public DateTime DateOfIssue { get; set; }
        public int CashierId { get; set; }
        public Cashier Cashier { get; set; }
        public int RegisterId { get; set; }
        public Register Register { get; set; }
        public ICollection<ReceiptProduct> ReceiptProducts { get; set; }
    }
}
