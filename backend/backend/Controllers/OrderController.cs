using backend.Services.Impl;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Web.Http.Controllers;
using AuthorizeAttribute = backend.Filters.CustomAuthorizeAttribute;

namespace backend.Controllers
{
    [Route("Orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private OrderService _orderService;
        private IHttpContextAccessor _httpContextAccessor;
        public OrderController(OrderService orderService, IHttpContextAccessor httpContextAccessor)
        {
            this._orderService = orderService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet("GetLatest")]
        public IActionResult GetLatest()
        {
            return Ok(_orderService.GetLatestOrder());
        }

        [HttpGet("Completed")]
        [Authorize(UserRole.Courier)]
        public IActionResult GetCompleted()
        {
           string userId = HttpContext.User.Identity.Name;
            int courierId = int.Parse(userId);
            return Ok(_orderService.GetCompletedOrders(courierId));
        }


    }
}
