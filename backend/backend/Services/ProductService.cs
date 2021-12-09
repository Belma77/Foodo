using Data.Models.Entities;
using System.Collections.Generic;

namespace backend.Services
{
    public interface IProductService
    {
        public List<Category> getCategories();

        public void create(Product product);
    }
}
