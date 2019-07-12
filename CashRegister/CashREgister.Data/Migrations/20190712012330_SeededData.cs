using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CashRegister.Data.Migrations
{
    public partial class SeededData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: -1);

            migrationBuilder.DeleteData(
                table: "Registers",
                keyColumn: "Id",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "Registers",
                keyColumn: "Id",
                keyValue: -1);

            migrationBuilder.InsertData(
                table: "Cashiers",
                columns: new[] { "Id", "DateOfBirth", "FirstName", "LastName", "Password" },
                values: new object[,]
                {
                    { 1, new DateTime(2001, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ante", "Antic", "ant" },
                    { 2, new DateTime(1991, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ivan", "Ivanic", "iva" }
                });

            migrationBuilder.InsertData(
                table: "Registers",
                column: "Id",
                values: new object[]
                {
                    1,
                    2
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Registers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Registers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.InsertData(
                table: "Cashiers",
                columns: new[] { "Id", "DateOfBirth", "FirstName", "LastName", "Password" },
                values: new object[,]
                {
                    { -1, new DateTime(2001, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ante", "Antic", "ant" },
                    { -2, new DateTime(1991, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ivan", "Ivanic", "iva" }
                });

            migrationBuilder.InsertData(
                table: "Registers",
                column: "Id",
                values: new object[]
                {
                    -1,
                    -2
                });
        }
    }
}
