using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Helpers;
using CashRegister.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace CashRegister.Data.Entities
{
    public class CashRegisterContext : DbContext
    {
        public CashRegisterContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Cashier> Cashiers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<ReceiptProduct> ReceiptProducts { get; set; }
        public DbSet<Register> Registers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReceiptProduct>()
                .HasKey(rp => new { rp.ReceiptId, rp.ProductId });
            modelBuilder.Entity<ReceiptProduct>()
                .HasOne(rp => rp.Receipt)
                .WithMany(r => r.ReceiptProducts)
                .HasForeignKey(rp => rp.ReceiptId);
            modelBuilder.Entity<ReceiptProduct>()
                .HasOne(rp => rp.Product)
                .WithMany(p => p.ReceiptProducts)
                .HasForeignKey(rp => rp.ProductId);

            modelBuilder.Entity<Cashier>()
           .HasData(new Cashier { Id=1, FirstName = "Ante", LastName = "Antic", Password = HashHelper.Hash("ante"), DateOfBirth=new DateTime(2001, 06, 10) },
                    new Cashier { Id=2, FirstName = "Ivan", LastName = "Ivanic", Password = HashHelper.Hash("1234"), DateOfBirth = new DateTime(1991, 06, 10) }
           );

            modelBuilder.Entity<Register>()
           .HasData(new Register {Id=1},
                    new Register {Id=2}
           );

        }
    }
}
