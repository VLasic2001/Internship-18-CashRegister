using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CashRegister.Data.Migrations
{
    public partial class SeedingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "Csiyiid8v6PgQIA6AOm1cO5ZR1nbUI8rVxlWyl4qFNS26XSj");

            migrationBuilder.UpdateData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "8Ln070G1j0Oq8AQtiXjRI9yu2V04yus2lzrnvhXhMgAPMA+0");

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "AvailableAmount", "Barcode", "Name", "PriceWithTax", "Type" },
                values: new object[,]
                {
                    { 1, 20, "12345678", "Sladoled", 8.0, 1 },
                    { 2, 8, "1568916952", "Riba", 30.0, 0 },
                    { 3, 13, "87654321", "Kikiriki", 6.0, 1 },
                    { 4, 15, "1761689234", "Energetsko pice", 12.0, 1 }
                });

            migrationBuilder.InsertData(
                table: "Receipts",
                columns: new[] { "Id", "CashierId", "DateOfIssue", "RegisterId" },
                values: new object[,]
                {
                    { new Guid("16403441-2da3-4030-85c1-a85f65a8d49b"), 1, new DateTime(2019, 7, 12, 12, 50, 39, 0, DateTimeKind.Unspecified), 1 },
                    { new Guid("b3cf70a8-fe5b-4bd5-b8a0-68102b1d520d"), 2, new DateTime(2019, 7, 13, 16, 16, 12, 0, DateTimeKind.Unspecified), 2 }
                });

            migrationBuilder.InsertData(
                table: "ReceiptProducts",
                columns: new[] { "ReceiptId", "ProductId", "Price", "Quantity", "TaxType" },
                values: new object[,]
                {
                    { new Guid("16403441-2da3-4030-85c1-a85f65a8d49b"), 1, 8.0, 2, 1 },
                    { new Guid("16403441-2da3-4030-85c1-a85f65a8d49b"), 2, 30.0, 1, 0 },
                    { new Guid("b3cf70a8-fe5b-4bd5-b8a0-68102b1d520d"), 2, 30.0, 3, 0 },
                    { new Guid("b3cf70a8-fe5b-4bd5-b8a0-68102b1d520d"), 3, 6.0, 8, 1 },
                    { new Guid("b3cf70a8-fe5b-4bd5-b8a0-68102b1d520d"), 4, 12.0, 1, 1 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ReceiptProducts",
                keyColumns: new[] { "ReceiptId", "ProductId" },
                keyValues: new object[] { new Guid("16403441-2da3-4030-85c1-a85f65a8d49b"), 1 });

            migrationBuilder.DeleteData(
                table: "ReceiptProducts",
                keyColumns: new[] { "ReceiptId", "ProductId" },
                keyValues: new object[] { new Guid("16403441-2da3-4030-85c1-a85f65a8d49b"), 2 });

            migrationBuilder.DeleteData(
                table: "ReceiptProducts",
                keyColumns: new[] { "ReceiptId", "ProductId" },
                keyValues: new object[] { new Guid("b3cf70a8-fe5b-4bd5-b8a0-68102b1d520d"), 2 });

            migrationBuilder.DeleteData(
                table: "ReceiptProducts",
                keyColumns: new[] { "ReceiptId", "ProductId" },
                keyValues: new object[] { new Guid("b3cf70a8-fe5b-4bd5-b8a0-68102b1d520d"), 3 });

            migrationBuilder.DeleteData(
                table: "ReceiptProducts",
                keyColumns: new[] { "ReceiptId", "ProductId" },
                keyValues: new object[] { new Guid("b3cf70a8-fe5b-4bd5-b8a0-68102b1d520d"), 4 });

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: new Guid("16403441-2da3-4030-85c1-a85f65a8d49b"));

            migrationBuilder.DeleteData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: new Guid("b3cf70a8-fe5b-4bd5-b8a0-68102b1d520d"));

            migrationBuilder.UpdateData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "ViLr7GL4ZhzGCtp4vA0cucfcv3v7QOvQLVz22WWE8VhT9T58");

            migrationBuilder.UpdateData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "pepHuDFdruzQWOmMm/11oojAiq+MI9mpE11DIJM39Kx0tC3u");
        }
    }
}
