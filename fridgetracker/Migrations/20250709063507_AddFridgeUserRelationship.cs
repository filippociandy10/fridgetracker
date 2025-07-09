using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fridgetracker.Migrations
{
    /// <inheritdoc />
    public partial class AddFridgeUserRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FridgeId",
                table: "FridgeItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Fridge",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fridge", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FridgeUser",
                columns: table => new
                {
                    FridgeId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FridgeUser", x => new { x.FridgeId, x.UserId });
                    table.ForeignKey(
                        name: "FK_FridgeUser_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FridgeUser_Fridge_FridgeId",
                        column: x => x.FridgeId,
                        principalTable: "Fridge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FridgeItems_FridgeId",
                table: "FridgeItems",
                column: "FridgeId");

            migrationBuilder.CreateIndex(
                name: "IX_FridgeUser_UserId",
                table: "FridgeUser",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_FridgeItems_Fridge_FridgeId",
                table: "FridgeItems",
                column: "FridgeId",
                principalTable: "Fridge",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FridgeItems_Fridge_FridgeId",
                table: "FridgeItems");

            migrationBuilder.DropTable(
                name: "FridgeUser");

            migrationBuilder.DropTable(
                name: "Fridge");

            migrationBuilder.DropIndex(
                name: "IX_FridgeItems_FridgeId",
                table: "FridgeItems");

            migrationBuilder.DropColumn(
                name: "FridgeId",
                table: "FridgeItems");
        }
    }
}
