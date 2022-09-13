using backend.Repositories;
using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
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
        private ImageService imageService;

        public ProductService(IProductRepository productRepository, IUserRepository userRepository, ImageService imageService)
        {
            this._productRepository = productRepository;
            this._userRepository = userRepository;
            this.imageService = imageService;
        }

        public List<Category> getCategories()
        {
            return this._productRepository.GetCategories();
        }

        public void create(ProductViewModel p, int restaurantId, IFormFile file)
        {
            Product product = new Product();
            Category category = _productRepository.findCategoryById(p.category);
            product.Category = category;
            product.name = p.name;
            product.description = p.description;
            product.price = p.price;

            product.image = imageService.saveImage(file);

            Restaurant restaurant = (Restaurant) _userRepository.findById(restaurantId);
            product.Restaurant = restaurant;
            this._productRepository.create(product);
        }

        public void edit(ProductViewModel p, IFormFile file, int id)
        {
            Product product = _productRepository.find(id);

            if(file != null)
            {
                string imagePath = this.imageService.saveImage(file);
                product.image = imagePath;
            }
            product.name = p.name;
            product.price = p.price;
            product.description = p.description;
            Category category = _productRepository.findCategoryById(p.category);
            product.Category = category;
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
