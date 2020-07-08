using System;
using Microsoft.EntityFrameworkCore;

namespace Calypso.ai.Models
{
    public class CSVFileContext : DbContext
    {

        public CSVFileContext() : base()
        {
        }

        public CSVFileContext(DbContextOptions<CSVFileContext> options)
            : base(options)
        {
        }

        public DbSet<CSVFile> CSVFiles { get; set; }
        public DbSet<Statistic> Statistics { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Statistic>()
                .HasOne(s => s.CSVFile)
                .WithMany(c => c.Statistics);
        }
    }
}
