using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Przychodnia.API
{
    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Absence> Absence { get; set; }
        public virtual DbSet<Day> Day { get; set; }
        public virtual DbSet<Employment> Employment { get; set; }
        public virtual DbSet<Leftvacationdays> Leftvacationdays { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Vacation> Vacation { get; set; }
        public virtual DbSet<Workschedule> Workschedule { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=localhost;database=przychodniadb;user=user;password=password;treattinyasboolean=true", x => x.ServerVersion("5.7.29-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Absence>(entity =>
            {
                entity.HasKey(e => e.IdAbsence)
                    .HasName("PRIMARY");

                entity.ToTable("absence");

                entity.Property(e => e.IdAbsence)
                    .HasColumnName("idAbsence")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Name)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            modelBuilder.Entity<Day>(entity =>
            {
                entity.HasKey(e => e.IdDay)
                    .HasName("PRIMARY");

                entity.ToTable("day");

                entity.HasIndex(e => e.IdWs)
                    .HasName("idWS_idx");

                entity.HasIndex(e => e.IdWsuser)
                    .HasName("idWSUser_idx");

                entity.Property(e => e.IdDay)
                    .HasColumnName("idDay")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FromTime).HasColumnType("time");

                entity.Property(e => e.IdWs)
                    .HasColumnName("idWS")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdWsuser)
                    .HasColumnName("idWSUser")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ToTime).HasColumnType("time");

                entity.HasOne(d => d.IdWsNavigation)
                    .WithMany(p => p.Day)
                    .HasForeignKey(d => d.IdWs)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idWS");
            });

            modelBuilder.Entity<Employment>(entity =>
            {
                entity.HasKey(e => e.IdEmployment)
                    .HasName("PRIMARY");

                entity.ToTable("employment");

                entity.Property(e => e.IdEmployment)
                    .HasColumnName("idEmployment")
                    .HasColumnType("int(11)");

                entity.Property(e => e.CurrentyEmployed).HasColumnType("tinyint(4)");

                entity.Property(e => e.FireDate).HasColumnType("date");

                entity.Property(e => e.HireDate).HasColumnType("date");

                entity.Property(e => e.WorkingHours).HasColumnType("int(11)");
            });

            modelBuilder.Entity<Leftvacationdays>(entity =>
            {
                entity.HasKey(e => e.IdlLeftVacationDays)
                    .HasName("PRIMARY");

                entity.ToTable("leftvacationdays");

                entity.HasIndex(e => e.IdAbsence)
                    .HasName("isAbsence_idx");

                entity.HasIndex(e => e.IdUser)
                    .HasName("idUser_idx");

                entity.Property(e => e.IdlLeftVacationDays)
                    .HasColumnName("idlLeftVacationDays")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdAbsence)
                    .HasColumnName("idAbsence")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdUser)
                    .HasColumnName("idUser")
                    .HasColumnType("int(11)");

                entity.Property(e => e.LeftDays).HasColumnType("int(11)");

                entity.HasOne(d => d.IdAbsenceNavigation)
                    .WithMany(p => p.Leftvacationdays)
                    .HasForeignKey(d => d.IdAbsence)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("isAbsence");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Leftvacationdays)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idUser");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.IdRole)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.Property(e => e.IdRole)
                    .HasColumnName("idRole")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Name)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PRIMARY");

                entity.ToTable("user");

                entity.HasIndex(e => e.IdEmpl)
                    .HasName("idEmpl_idx");

                entity.HasIndex(e => e.IdRole)
                    .HasName("idRole_idx");

                entity.Property(e => e.IdUser)
                    .HasColumnName("idUser")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FirstName)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Hash)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.IdEmpl)
                    .HasColumnName("idEmpl")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdRole)
                    .HasColumnName("idRole")
                    .HasColumnType("int(11)");

                entity.Property(e => e.LastName)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Mail)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Password)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.Property(e => e.Salt)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("latin1")
                    .HasCollation("latin1_swedish_ci");

                entity.HasOne(d => d.IdEmplNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.IdEmpl)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idEmpl");

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.IdRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idRole");
            });

            modelBuilder.Entity<Vacation>(entity =>
            {
                entity.HasKey(e => e.IdVacation)
                    .HasName("PRIMARY");

                entity.ToTable("vacation");

                entity.HasIndex(e => e.IdAbsenceVac)
                    .HasName("idAbsenceVac_idx");

                entity.HasIndex(e => e.IdUserVac)
                    .HasName("idUserVac_idx");

                entity.Property(e => e.IdVacation)
                    .HasColumnName("idVacation")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FromDate).HasColumnType("date");

                entity.Property(e => e.IdAbsenceVac)
                    .HasColumnName("idAbsenceVac")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdUserVac)
                    .HasColumnName("idUserVac")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ToDate).HasColumnType("date");

                entity.HasOne(d => d.IdAbsenceVacNavigation)
                    .WithMany(p => p.Vacation)
                    .HasForeignKey(d => d.IdAbsenceVac)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idAbsenceVac");

                entity.HasOne(d => d.IdUserVacNavigation)
                    .WithMany(p => p.Vacation)
                    .HasForeignKey(d => d.IdUserVac)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idUserVac");
            });

            modelBuilder.Entity<Workschedule>(entity =>
            {
                entity.HasKey(e => e.IdWorkSchedule)
                    .HasName("PRIMARY");

                entity.ToTable("workschedule");

                entity.HasIndex(e => e.IdUser)
                    .HasName("idUser_idx");

                entity.Property(e => e.IdWorkSchedule)
                    .HasColumnName("idWorkSchedule")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Current).HasColumnType("tinyint(4)");

                entity.Property(e => e.IdUser)
                    .HasColumnName("idUser")
                    .HasColumnType("int(11)");

                entity.Property(e => e.WeekNumber).HasColumnType("int(11)");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Workschedule)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idUserWS");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
