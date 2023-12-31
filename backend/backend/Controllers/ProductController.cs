﻿using backend.Filters;
using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static backend.Utils.AuthConstants;
using System;
using AuthorizeAttribute = backend.Filters.CustomAuthorizeAttribute;
using Data.Models.Enums;
using backend.Services.Impl;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _productService;

        public ProductController(IProductService productService)
        {
            this._productService = productService;
        }

        [HttpGet]
        [Route("categories")]
        [Authorize(UserRole.Customer, UserRole.Restaurant)]
        public IActionResult getCategories()
        {
            return Ok(this._productService.getCategories());
        }

        [HttpPost]
        [Authorize(UserRole.Restaurant)]
        public IActionResult addProduct([FromForm] IFormFile file, [FromForm] string body)
        {
            int userId = int.Parse(HttpContext.User.Identity.Name);
            ProductViewModel product = JsonConvert.DeserializeObject<ProductViewModel>(body);
            this._productService.create(product, userId, file);
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(UserRole.Restaurant)]
        public IActionResult editProduct([FromForm] string body, [FromForm] IFormFile file, int id)
        {
            ProductViewModel product = JsonConvert.DeserializeObject<ProductViewModel>(body);
            this._productService.edit(product, file, id);
            return Ok();
        }


        [HttpGet]
        [Route("menu")]
        [Authorize(UserRole.Restaurant)]
        public IActionResult getMenu()
        {

            int userId = int.Parse(HttpContext.User.Identity.Name);
            return Ok(_productService.getMenu(userId));
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult getProduct(int id)
        { 
              return Ok(_productService.GetProduct(id));
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(UserRole.Restaurant)]
        public IActionResult deleteProduct(int id)
        {
            _productService.delete(id);
            return Ok();
        }

    }
}
