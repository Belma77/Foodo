using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Data
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
            //this.ChangeTracker.LazyLoadingEnabled = false;
        }

        public DbSet<Product> products { get; set; }

        public DbSet<Category> categories{ get; set; }

        public DbSet<User> users { get; set; }

        public DbSet<Customer> costomers { get; set; }

        public DbSet<Restaurant> restaurants { get; set; }

        public DbSet<Courier> couriers { get; set; }

        public DbSet<Order> orders { get; set; }

        public DbSet<OrderRecord> orderRecords { get; set; }

        public DbSet<Reviews> reviews { get; set; }
         
        public DbSet<Location> locations { get; set; }
        public DbSet<Log> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasIndex(u => u.email)
                .IsUnique();
            
            builder.Entity<User>()
            .HasDiscriminator<UserRole>("discriminator")
            .HasValue<Customer>((UserRole.Customer))
            .HasValue<Courier>((UserRole.Courier))
            .HasValue<Restaurant>((UserRole.Restaurant));

            builder.Entity<Customer>().Property(c => c.firstName).HasColumnName("firstName");
            builder.Entity<Customer>().Property(c => c.lastname).HasColumnName("lastName");
            builder.Entity<Courier>().Property(c => c.firstName).HasColumnName("firstName");
            builder.Entity<Courier>().Property(c => c.lastName).HasColumnName("lastName");

            

        }

        private string generateHashedPassword(byte[] salt, string password)
        {

            //derive a 256 - bit subkey(use HMACSHA256 with 100, 000 iterations)
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hashedPassword;
        }

    }
}
