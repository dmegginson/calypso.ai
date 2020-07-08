using System;
using Microsoft.EntityFrameworkCore;

namespace Calypso.ai.Models
{
    public class EntryContext : DbContext
    {
        public EntryContext() : base()
        {
        }

        public EntryContext(DbContextOptions<EntryContext> options)
            : base(options)
        {
        }

        public DbSet<Entry> Entries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Entry>()
                   .HasAlternateKey(e => new { e.Id, e.CSVFileId });
        }
    }
}