using Data.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace Data
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        { }

        public DbSet<Product> products { get; set; }

        public DbSet<User> users { get; set; }

        public DbSet<Consumer> consumer { get; set; }

        public DbSet<Courier> couriers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.email)
                .IsUnique();
        }
    }
}
