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
        private IUserRepository _userRepository;

        public ProductService(IProductRepository productRepository, IUserRepository userRepository)
        {
            this._productRepository = productRepository;
            this._userRepository = userRepository;
        }

        public List<Category> getCategories()
        {
            return this._productRepository.GetCategories();
        }

        public void create(Product product)
        {
            Category category = _productRepository.findCategoryById(product.Category.id);
            product.Category = category;
            Restaurant restaurant = (Restaurant) _userRepository.findById(1);
            product.Restaurant = restaurant;
            this._productRepository.create(product);
        }

        public void edit(Product p, int id)
        {
            Product product = _productRepository.find(id);
            product.name = p.name;
            product.price = p.price;
            product.description = p.description;
            product.image = p.image;
            product.Category = p.Category;
            _productRepository.update(product);
        }

        public void delete(int id)
        {
            Product product = _productRepository.find(id);
            _productRepository.delete(product);
        }

        public List<Product> getMenu(int restaurantId)
        {
            return _productRepository.getMenu(restaurantId);
        }

        public Product GetProduct(int id)
        {
            return _productRepository.find(id);
        }
    }
}
