﻿// <auto-generated />
using System;
using CashRegister.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CashRegister.Data.Migrations
{
    [DbContext(typeof(CashRegisterContext))]
    partial class CashRegisterContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Cashier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.HasKey("Id");

                    b.ToTable("Cashiers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DateOfBirth = new DateTime(2001, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "Ante",
                            LastName = "Antic",
                            Password = "ViLr7GL4ZhzGCtp4vA0cucfcv3v7QOvQLVz22WWE8VhT9T58"
                        },
                        new
                        {
                            Id = 2,
                            DateOfBirth = new DateTime(1991, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "Ivan",
                            LastName = "Ivanic",
                            Password = "pepHuDFdruzQWOmMm/11oojAiq+MI9mpE11DIJM39Kx0tC3u"
                        });
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AvailableAmount");

                    b.Property<string>("Barcode");

                    b.Property<string>("Name");

                    b.Property<double>("PriceWithTax");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Receipt", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CashierId");

                    b.Property<DateTime>("DateOfIssue");

                    b.Property<int>("RegisterId");

                    b.HasKey("Id");

                    b.HasIndex("CashierId");

                    b.HasIndex("RegisterId");

                    b.ToTable("Receipts");
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.ReceiptProduct", b =>
                {
                    b.Property<Guid>("ReceiptId");

                    b.Property<int>("ProductId");

                    b.Property<double>("Price");

                    b.Property<int>("Quantity");

                    b.Property<int>("TaxType");

                    b.HasKey("ReceiptId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ReceiptProducts");
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Register", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("Id");

                    b.ToTable("Registers");

                    b.HasData(
                        new
                        {
                            Id = 1
                        },
                        new
                        {
                            Id = 2
                        });
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Receipt", b =>
                {
                    b.HasOne("CashRegister.Data.Entities.Models.Cashier", "Cashier")
                        .WithMany("Receipts")
                        .HasForeignKey("CashierId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CashRegister.Data.Entities.Models.Register", "Register")
                        .WithMany("Receipts")
                        .HasForeignKey("RegisterId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.ReceiptProduct", b =>
                {
                    b.HasOne("CashRegister.Data.Entities.Models.Product", "Product")
                        .WithMany("ReceiptProducts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CashRegister.Data.Entities.Models.Receipt", "Receipt")
                        .WithMany("ReceiptProducts")
                        .HasForeignKey("ReceiptId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
