using AutoMapper;
using backend.Repositories;
using backend.Services.Interfaces;
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
        private IImageService imageService;
        private IMapper _mapper;
        public ProductService(IProductRepository productRepository, IUserRepository userRepository, IImageService imageService, IMapper mapper)
        {
            this._productRepository = productRepository;
            this._userRepository = userRepository;
            this.imageService = imageService;
            _mapper = mapper;
        }

        public List<CategoryVM> getCategories()
        {
            var categories=this._productRepository.GetCategories();
            return _mapper.Map<List<CategoryVM>>(categories);
        }

        public void create(ProductViewModel p, int restaurantId, IFormFile file)
        {
            Product product = new Product();
            Category category = _productRepository.findCategoryById(p.Category.Id);
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
            Category category = _productRepository.findCategoryById(p.categoryId);
            product.Category = category;
            _productRepository.update(product);
        }

        public void delete(int id)
        {
            Product product = _productRepository.find(id);
            _productRepository.delete(product);
        }

        public List<ProductViewModel> getMenu(int restaurantId)
        {
            var products=_productRepository.getMenu(restaurantId);
            return _mapper.Map<List<ProductViewModel>>(products);
        }

        public ProductViewModel GetProduct(int id)
        {

            var product=_productRepository.find(id);
            return _mapper.Map<ProductViewModel>(product);
        }
    }
}
