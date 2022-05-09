using backend.Filters;
using backend.Services;
using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static backend.Utils.AuthConstants;
using System;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;
using Data.Models.Enums;

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
        [Authorize(UserRole.RESTAURANT)]
        public IActionResult addProduct([FromForm] IFormFile file, [FromForm] string body)
        {
            int restaurantId = ((User)HttpContext.Items[USER_TYPED_KEY]).Id;
            ProductViewModel product = JsonConvert.DeserializeObject<ProductViewModel>(body);
            this._productService.create(product, restaurantId, file);
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult editProduct([FromForm] Product product, [FromForm] IFormFile file, int id)
        {
            this._productService.edit(product, id);
            return Ok();
        }


        [HttpGet]
        [Route("menu")]
        public IActionResult getMenu()
        {
            int restaurantId = ((User)HttpContext.Items[USER_TYPED_KEY]).Id;
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
