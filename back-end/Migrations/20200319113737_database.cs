using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Przychodnia.API.Migrations
{
    public partial class database : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "absence",
                columns: table => new
                {
                    idAbsence = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(45)", nullable: true)
                        .Annotation("MySql:CharSet", "latin1")
                        .Annotation("MySql:Collation", "latin1_swedish_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.idAbsence);
                });

            migrationBuilder.CreateTable(
                name: "employment",
                columns: table => new
                {
                    idEmployment = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    WorkingHours = table.Column<int>(type: "int(11)", nullable: true),
                    CurrentyEmployed = table.Column<sbyte>(type: "tinyint(4)", nullable: true),
                    HireDate = table.Column<DateTime>(type: "date", nullable: true),
                    FireDate = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.idEmployment);
                });

            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    idRole = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(45)", nullable: true)
                        .Annotation("MySql:CharSet", "latin1")
                        .Annotation("MySql:Collation", "latin1_swedish_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.idRole);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    idUser = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(type: "varchar(45)", nullable: true)
                        .Annotation("MySql:CharSet", "latin1")
                        .Annotation("MySql:Collation", "latin1_swedish_ci"),
                    LastName = table.Column<string>(type: "varchar(45)", nullable: true)
                        .Annotation("MySql:CharSet", "latin1")
                        .Annotation("MySql:Collation", "latin1_swedish_ci"),
                    Mail = table.Column<string>(type: "varchar(45)", nullable: true)
                        .Annotation("MySql:CharSet", "latin1")
                        .Annotation("MySql:Collation", "latin1_swedish_ci"),
                    Hash = table.Column<byte[]>(type: "blob", nullable: true),
                    Salt = table.Column<byte[]>(type: "blob", nullable: true),
                    idRole = table.Column<int>(type: "int(11)", nullable: false),
                    idEmpl = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.idUser);
                    table.ForeignKey(
                        name: "idEmpl",
                        column: x => x.idEmpl,
                        principalTable: "employment",
                        principalColumn: "idEmployment",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "idRole",
                        column: x => x.idRole,
                        principalTable: "role",
                        principalColumn: "idRole",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "leftvacationdays",
                columns: table => new
                {
                    idlLeftVacationDays = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LeftDays = table.Column<int>(type: "int(11)", nullable: true),
                    idUser = table.Column<int>(type: "int(11)", nullable: true),
                    idAbsence = table.Column<int>(type: "int(11)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.idlLeftVacationDays);
                    table.ForeignKey(
                        name: "isAbsence",
                        column: x => x.idAbsence,
                        principalTable: "absence",
                        principalColumn: "idAbsence",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "idUser",
                        column: x => x.idUser,
                        principalTable: "user",
                        principalColumn: "idUser",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "vacation",
                columns: table => new
                {
                    idVacation = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FromDate = table.Column<DateTime>(type: "date", nullable: true),
                    ToDate = table.Column<DateTime>(type: "date", nullable: true),
                    idUserVac = table.Column<int>(type: "int(11)", nullable: true),
                    idAbsenceVac = table.Column<int>(type: "int(11)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.idVacation);
                    table.ForeignKey(
                        name: "idAbsenceVac",
                        column: x => x.idAbsenceVac,
                        principalTable: "absence",
                        principalColumn: "idAbsence",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "idUserVac",
                        column: x => x.idUserVac,
                        principalTable: "user",
                        principalColumn: "idUser",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "workschedule",
                columns: table => new
                {
                    idWorkSchedule = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Current = table.Column<sbyte>(type: "tinyint(4)", nullable: true),
                    WeekNumber = table.Column<int>(type: "int(11)", nullable: true),
                    idUser = table.Column<int>(type: "int(11)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.idWorkSchedule);
                    table.ForeignKey(
                        name: "idUserWS",
                        column: x => x.idUser,
                        principalTable: "user",
                        principalColumn: "idUser",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "day",
                columns: table => new
                {
                    idDay = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FromTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    ToTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    idWS = table.Column<int>(type: "int(11)", nullable: false),
                    idWSUser = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.idDay);
                    table.ForeignKey(
                        name: "idWS",
                        column: x => x.idWS,
                        principalTable: "workschedule",
                        principalColumn: "idWorkSchedule",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "idWS_idx",
                table: "day",
                column: "idWS");

            migrationBuilder.CreateIndex(
                name: "idWSUser_idx",
                table: "day",
                column: "idWSUser");

            migrationBuilder.CreateIndex(
                name: "isAbsence_idx",
                table: "leftvacationdays",
                column: "idAbsence");

            migrationBuilder.CreateIndex(
                name: "idUser_idx",
                table: "leftvacationdays",
                column: "idUser");

            migrationBuilder.CreateIndex(
                name: "idEmpl_idx",
                table: "user",
                column: "idEmpl");

            migrationBuilder.CreateIndex(
                name: "idRole_idx",
                table: "user",
                column: "idRole");

            migrationBuilder.CreateIndex(
                name: "idAbsenceVac_idx",
                table: "vacation",
                column: "idAbsenceVac");

            migrationBuilder.CreateIndex(
                name: "idUserVac_idx",
                table: "vacation",
                column: "idUserVac");

            migrationBuilder.CreateIndex(
                name: "idUser_idx",
                table: "workschedule",
                column: "idUser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "day");

            migrationBuilder.DropTable(
                name: "leftvacationdays");

            migrationBuilder.DropTable(
                name: "vacation");

            migrationBuilder.DropTable(
                name: "workschedule");

            migrationBuilder.DropTable(
                name: "absence");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "employment");

            migrationBuilder.DropTable(
                name: "role");
        }
    }
}
