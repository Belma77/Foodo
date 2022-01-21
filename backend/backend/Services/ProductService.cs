using Data.Models.Entities;
using System.Collections.Generic;

namespace backend.Services
{
    public interface IProductService
    {
        public List<Category> getCategories();

        public void create(Product product);

        public void edit(Product product, int id);

        public void delete(int id);

        public List<Product> getMenu(int restaurantId);

        public Product GetProduct(int id);
    }
}
