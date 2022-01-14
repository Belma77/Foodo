using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Data
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        { }

        public DbSet<Product> products { get; set; }

        public DbSet<Category> categories{ get; set; }

        public DbSet<User> users { get; set; }

        public DbSet<Customer> consumer { get; set; }

        public DbSet<Courier> couriers { get; set; }

        public DbSet<Order> orders { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.email)
                .IsUnique();

            builder.Entity<User>()
            .HasDiscriminator<int>("discriminator")
            .HasValue<Customer>(((int)UserRole.CUSTOMER))
            .HasValue<Courier>(((int)UserRole.COURIER))
            .HasValue<Restaurant>(((int)UserRole.RESTAURANT));

            builder.Entity<Customer>().Property(c => c.firstName).HasColumnName("firstName");
            builder.Entity<Customer>().Property(c => c.lastname).HasColumnName("lastName");
            builder.Entity<Courier>().Property(c => c.firstName).HasColumnName("firstName");
            builder.Entity<Courier>().Property(c => c.lastname).HasColumnName("lastName");

            builder.Entity<Category>()
                .HasData(
                   new { id = 1, name = "Breakfast"},
                   new { id = 2, name = "Pasta" },
                   new { id = 3, name = "Pizza" }
                );
        }
    }
}
