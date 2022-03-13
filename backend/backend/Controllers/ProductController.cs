using backend.Filters;
using backend.Services;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;

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
        public IActionResult getCategories()
        {
            return Ok(this._productService.getCategories());
        }

        [HttpPost]
        //[Authorize(UserRole.RESTAURANT)]
        public IActionResult addProduct([FromBody] Product product)
        {
            this._productService.create(product);
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult editProduct([FromBody] Product product, int id)
        {
            this._productService.edit(product, id);
            return Ok();
        }


        [HttpGet]
        public IActionResult getMenu()
        {
            //get user id from jwt or send it in request
            int restaurantId = 1;
            return Ok(_productService.getMenu(restaurantId));
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult getProduct(int id)
        { 
              return Ok(_productService.GetProduct(id));
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult deleteProduct(int id)
        {
            _productService.delete(id);
            return Ok();
        }

    }
}
