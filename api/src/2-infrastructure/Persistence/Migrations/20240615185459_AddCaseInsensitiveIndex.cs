using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shoplists.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCaseInsensitiveIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:CollationDefinition:case_insensitive_collation", "en-u-ks-primary,en-u-ks-primary,icu,False");

            migrationBuilder.CreateIndex(
                name: "IX_Lists_Name_Owner",
                table: "Lists",
                columns: new[] { "Name", "Owner" },
                unique: true)
                .Annotation("Relational:Collation", new[] { "case_insensitive_collation" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Lists_Name_Owner",
                table: "Lists");

            migrationBuilder.AlterDatabase()
                .OldAnnotation("Npgsql:CollationDefinition:case_insensitive_collation", "en-u-ks-primary,en-u-ks-primary,icu,False");
        }
    }
}
