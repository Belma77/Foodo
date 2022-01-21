using Data;
using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories.Impl
{
    public class ProductRepository : IProductRepository
    {
        private MyContext dbContext;
        public ProductRepository(MyContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Category> GetCategories()
        {
            return this.dbContext.categories.ToList();
        }

        public Category findCategoryById (int id)
        {
            return this.dbContext.categories.Find(id);
        }

        public void create(Product product)
        {
            this.dbContext.products.Add(product);
            this.dbContext.SaveChanges();
        }

        public void update(Product product)
        {
            this.dbContext.products.Update(product);
            this.dbContext.SaveChanges();
        }

        public void delete(Product product)
        {
            dbContext.products.Remove(product);
            dbContext.SaveChanges();
        }

        public Product find(int id)
        {
            return dbContext.products.Find(id);
        }

        public List<Product> getMenu(int restaurantId)
        {
            return dbContext.products.Where(p => p.Restaurant.Id == restaurantId).ToList(); 
        }
    }
}
