using Microsoft.EntityFrameworkCore.Migrations;
using System.IO;

namespace Data.Migrations
{
    public partial class seedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var path = "../Data/Script/scriptFoodo.sql";
            var query = File.ReadAllText(path);
            migrationBuilder.Sql(query);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
