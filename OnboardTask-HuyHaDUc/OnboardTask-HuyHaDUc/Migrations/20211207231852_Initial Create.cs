using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OnboardTask_HuyHaDUc.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MVPCustomers",
                columns: table => new
                {
                    customerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MVPCustomers", x => x.customerID);
                });

            migrationBuilder.CreateTable(
                name: "MVPProducts",
                columns: table => new
                {
                    productID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MVPProducts", x => x.productID);
                });

            migrationBuilder.CreateTable(
                name: "MVPStores",
                columns: table => new
                {
                    storeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MVPStores", x => x.storeID);
                });

            migrationBuilder.CreateTable(
                name: "MVPSales",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    customerID = table.Column<int>(type: "int", nullable: false),
                    storeID = table.Column<int>(type: "int", nullable: false),
                    productID = table.Column<int>(type: "int", nullable: false),
                    dateSold = table.Column<DateTime>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MVPSales", x => x.id);
                    table.ForeignKey(
                        name: "FK_MVPSales_MVPCustomers_customerID",
                        column: x => x.customerID,
                        principalTable: "MVPCustomers",
                        principalColumn: "customerID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MVPSales_MVPProducts_productID",
                        column: x => x.productID,
                        principalTable: "MVPProducts",
                        principalColumn: "productID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MVPSales_MVPStores_storeID",
                        column: x => x.storeID,
                        principalTable: "MVPStores",
                        principalColumn: "storeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MVPSales_customerID",
                table: "MVPSales",
                column: "customerID");

            migrationBuilder.CreateIndex(
                name: "IX_MVPSales_productID",
                table: "MVPSales",
                column: "productID");

            migrationBuilder.CreateIndex(
                name: "IX_MVPSales_storeID",
                table: "MVPSales",
                column: "storeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MVPSales");

            migrationBuilder.DropTable(
                name: "MVPCustomers");

            migrationBuilder.DropTable(
                name: "MVPProducts");

            migrationBuilder.DropTable(
                name: "MVPStores");
        }
    }
}
