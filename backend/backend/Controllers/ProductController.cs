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
        [Route("add")]
        [Authorize(UserRole.RESTAURANT)]
        public IActionResult addProduct([FromBody] Product product)
        {
            this._productService.create(product);
            return Ok();
        }

    }
}
