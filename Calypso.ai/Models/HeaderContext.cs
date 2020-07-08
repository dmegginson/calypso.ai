using System;
using Microsoft.EntityFrameworkCore;

namespace Calypso.ai.Models
{
    public class HeaderContext : DbContext
    {
        public HeaderContext() : base()
        {
        }

        public HeaderContext(DbContextOptions<HeaderContext> options)
            : base(options)
        {
        }

        public DbSet<Header> Headers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
