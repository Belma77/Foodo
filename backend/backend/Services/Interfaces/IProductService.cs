using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace backend.Services.Interfaces
{
    public interface IProductService
    {
        public List<CategoryVM> getCategories();

        public void create(ProductViewModel product, int restaurantId, IFormFile file);

        public void edit(ProductViewModel product, IFormFile file, int id);

        public void delete(int id);

        public List<ProductViewModel> getMenu(int restaurantId);

        public ProductViewModel GetProduct(int id);
    }
}
