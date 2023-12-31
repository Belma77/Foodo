﻿using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface IProductRepository
    {
        public List<Category> GetCategories();

        public Category findCategoryById(int id);

        public void create(Product product);

        public void update(Product product);

        public void delete(Product product);

        public Product find(int id);

        public List<Product> getMenu(int restaurantId);

    }
}
