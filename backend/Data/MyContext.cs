﻿using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

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

            builder.Entity<Category>()
                .HasData(
                   new { Id = 1, name = "Breakfast" },
                   new { Id = 2, name = "Pasta" },
                   new { Id = 3, name = "Pizza" }
                );

            //byte[] salt = new byte[128 / 8];

            //builder.Entity<Customer>().HasData(
            //    new Customer
            //    {
            //        email = "john@doe",
            //        firstName = "John",
            //        lastname = "Doe",
            //        password = generateHashedPassword(salt, "password"),
            //        Id = 3,
            //        role = UserRole.Customer,
            //        StoredSalt = salt,
            //    });


            //builder.Entity<Restaurant>().HasData(
            //new Restaurant
            //{
            //    email = "slatko@slano",
            //    Id = 1,
            //    deliveryCost = 3,
            //    password = "test",
            //    rating = 10,
            //    avgDeliveryTime = "15-25",
            //    name = "Slatko i Slano",
            //    numberOfReviews = 2,
            //    role = UserRole.RESTAURANT,
            //    slug = "slatko-i-slano",
            //    headerImage = "Resources/Images/slatkoislano"
            //},
            // new Restaurant
            // {
            //     email = "mostar@lic",
            //     Id = 2,
            //     deliveryCost = 3,
            //     password = "test",
            //     rating = 163,
            //     avgDeliveryTime = "15-25",
            //     name = "Mostarlic",
            //     numberOfReviews = 10,
            //     role = UserRole.RESTAURANT,
            //     slug = "mostarlic",
            //     headerImage = "Resources/images/mostarlic"
            // }
            //);

            //builder.Entity<Product>()
            //   .HasData
            //   (
            //      new
            //      {
            //          Id = 1,
            //          name = "Cury Wok",
            //          description = "Pileći rezanci u curry sosu",
            //          price = 10.0,
            //          Categoryid = 1,
            //          RestaurantId = 1,
            //          image = "https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/xrlekpen0sx6mezcpdiy"
            //      },
            //    new
            //    {
            //        Id = 2,
            //        name = "Omlet sa gljivama",
            //        description = "Jaja, gljive, puter, pavlaka, ajvar",
            //        price = 6.0,
            //        Categoryid = 1,
            //        RestaurantId = 1, 
            //        image = "https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ic5sxbyseterecbv1jzf"
            //    },
            //    new
            //    {
            //        Id = 3,
            //        name = "Pizza Margharita",
            //        description = "Sir edamer, gljive, pureća prsa, paradajz sos, začini",
            //        price = 7.0,
            //        Categoryid = 1,
            //        RestaurantId = 1,
            //        image = "https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/amvq5gefoirp0qf8hljp"
            //    });

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
