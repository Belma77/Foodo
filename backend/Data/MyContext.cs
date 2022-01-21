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

        public DbSet<Restaurant> restaurants { get; set; }

        public DbSet<Courier> couriers { get; set; }

        public DbSet<Order> orders { get; set; }

        public DbSet<OrderRecord> orderRecords { get; set; }


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


            builder.Entity<Restaurant>().HasData(
            new Restaurant
            {
                email = "slatko@slano",
                Id = 1,
                deliveryCost = 3,
                password = "test",
                rating = 10,
                avgDeliveryTime = "15-25",
                name = "Slatko i Slano",
                numberOfReviews = 2,
                role = UserRole.RESTAURANT,
                slug = "slatko-i-slano",
                headerImage = "https://res.cloudinary.com/glovoapp/w_450,h_250,c_fill,f_auto,q_auto/Stores/wy4xymearvmy7vzglvc2"
            },
             new Restaurant
             {
                 email = "mostar@lic",
                 Id = 2,
                 deliveryCost = 3,
                 password = "test",
                 rating = 163,
                 avgDeliveryTime = "15-25",
                 name = "Mostarlic",
                 numberOfReviews = 10,
                 role = UserRole.RESTAURANT,
                 slug = "mostarlic",
                 headerImage = "https://res.cloudinary.com/glovoapp/w_450,h_250,c_fill,f_auto,q_auto/Stores/mglozbioqdnwvv2onr22"
             }
            );

            builder.Entity<Product>()
               .HasData
               (
                  new
                  {
                      Id = 1,
                      name = "Cury Wok",
                      description = "Pileći rezanci u curry sosu",
                      price = 10.0,
                      Categoryid = 1,
                      RestaurantId = 1,
                      image = "https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/xrlekpen0sx6mezcpdiy"
                  },
                new
                {
                    Id = 2,
                    name = "Omlet sa gljivama",
                    description = "Jaja, gljive, puter, pavlaka, ajvar",
                    price = 6.0,
                    Categoryid = 1,
                    RestaurantId = 1, 
                    image = "https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/ic5sxbyseterecbv1jzf"
                },
                new
                {
                    Id = 3,
                    name = "Pizza Margharita",
                    description = "Sir edamer, gljive, pureća prsa, paradajz sos, začini",
                    price = 7.0,
                    Categoryid = 1,
                    RestaurantId = 1,
                    image = "https://res.cloudinary.com/glovoapp/w_600,f_auto,q_auto/Products/amvq5gefoirp0qf8hljp"
                });
                
        }

    }
}
