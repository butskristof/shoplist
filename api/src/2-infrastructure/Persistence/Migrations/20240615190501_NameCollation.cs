using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shoplists.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class NameCollation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Lists",
                type: "character varying(512)",
                maxLength: 512,
                nullable: false,
                collation: "case_insensitive_collation",
                oldClrType: typeof(string),
                oldType: "character varying(512)",
                oldMaxLength: 512);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Lists",
                type: "character varying(512)",
                maxLength: 512,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(512)",
                oldMaxLength: 512,
                oldCollation: "case_insensitive_collation");
        }
    }
}
