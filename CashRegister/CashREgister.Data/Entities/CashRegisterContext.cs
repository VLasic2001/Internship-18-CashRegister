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

            //modelBuilder.Entity<Cashier>()
            //.HasData(new Cashier { Id=1, FirstName = "Ante", LastName = "Antic", Password = HashHelper.Hash("ante"), DateOfBirth = new DateTime(2001, 06, 10) },
            //         new Cashier { Id=2, FirstName = "Ivan", LastName = "Ivanic", Password = HashHelper.Hash("1234"), DateOfBirth = new DateTime(1991, 06, 10) }
            //);

            // modelBuilder.Entity<Register>()
            //.HasData(new Register {Id=1},
            //         new Register {Id=2}
            //);

            var firstSeedCashier = new Cashier { Id = 1, FirstName = "Ante", LastName = "Antic", Password = HashHelper.Hash("ante"), DateOfBirth = new DateTime(2001, 06, 10) };
            var secondSeedCashier = new Cashier { Id = 2, FirstName = "Ivan", LastName = "Ivanic", Password = HashHelper.Hash("1234"), DateOfBirth = new DateTime(1991, 06, 10) };
            modelBuilder.Entity<Cashier>()
           .HasData(firstSeedCashier, secondSeedCashier);


            var firstSeedRegister = new Register { Id = 1 };
            var secondSeedRegister = new Register { Id = 2 };
            modelBuilder.Entity<Register>()
           .HasData(firstSeedRegister, secondSeedRegister);


            var firstSeedProduct = new Product { Id = 1, Barcode = "12345678", Name = "Sladoled", AvailableAmount = 20, PriceWithTax = 8, Type = Enums.TaxType.other };
            var secondSeedProduct = new Product { Id = 2, Barcode = "1568916952", Name = "Riba", AvailableAmount = 8, PriceWithTax = 30, Type = Enums.TaxType.excise };
            var thirdSeedProduct = new Product { Id = 3, Barcode = "87654321", Name = "Kikiriki", AvailableAmount = 13, PriceWithTax = 6, Type = Enums.TaxType.other };
            var fourthSeedProduct = new Product { Id = 4, Barcode = "1761689234", Name = "Energetsko pice", AvailableAmount = 15, PriceWithTax = 12, Type = Enums.TaxType.other };

            modelBuilder.Entity<Product>().HasData(firstSeedProduct, secondSeedProduct, thirdSeedProduct, fourthSeedProduct);

            var firstSeedReceipt = new Receipt { Id = Guid.NewGuid(), CashierId = 1, DateOfIssue = new DateTime(2019, 07, 12, 12, 50, 39), RegisterId = 1 };
            var secondSeedReceipt = new Receipt { Id = Guid.NewGuid(), CashierId = 2, DateOfIssue = new DateTime(2019, 07, 13, 16, 16, 12), RegisterId = 2 };


            modelBuilder.Entity<Receipt>().HasData(firstSeedReceipt, secondSeedReceipt);

            modelBuilder.Entity<ReceiptProduct>().HasData(
                new ReceiptProduct { ProductId = 1, Price = 8, Quantity = 2, ReceiptId = firstSeedReceipt.Id, TaxType = Enums.TaxType.other },
                new ReceiptProduct { ProductId = 2, Price = 30, Quantity = 1, ReceiptId = firstSeedReceipt.Id, TaxType = Enums.TaxType.excise },
                new ReceiptProduct { ProductId = 2, Price = 30, Quantity = 3, ReceiptId = secondSeedReceipt.Id, TaxType = Enums.TaxType.excise },
                new ReceiptProduct { ProductId = 3, Price = 6, Quantity = 8, ReceiptId = secondSeedReceipt.Id, TaxType = Enums.TaxType.other },
                new ReceiptProduct { ProductId = 4, Price = 12, Quantity = 1, ReceiptId = secondSeedReceipt.Id, TaxType = Enums.TaxType.other }
                );
        }
    }
}
