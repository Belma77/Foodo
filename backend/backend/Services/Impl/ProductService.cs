using backend.Repositories;
using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            this._productRepository = productRepository;
        }

        public List<Category> getCategories()
        {
            return this._productRepository.GetCategories();
        }

        public void create(Product product)
        {
            Category category = _productRepository.findCategoryById(product.category.id);
            product.category = category;
            this._productRepository.create(product);
        }
    }
}
