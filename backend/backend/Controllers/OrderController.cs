using backend.Services.Impl;
using backend.Services.Interfaces;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
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
        private IOrderService _orderService;
        private IHttpContextAccessor _httpContextAccessor;
        public OrderController(IOrderService orderService, IHttpContextAccessor httpContextAccessor)
        {
            this._orderService = orderService;
            _httpContextAccessor = httpContextAccessor;
        }
        [HttpPost]
        [Authorize(UserRole.Customer)]
        public IActionResult createOrder([FromBody] OrderViewModel order)
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value);
            _orderService.createOrder(order, userId);
            return Ok();
        }

        [HttpGet("{id}")]
        [Authorize(UserRole.Courier, UserRole.Restaurant)]
        public IActionResult getOrder([FromRoute] int id)
        {
            OrderViewModel order = _orderService.GetOrder(id);
            return Ok(order);
            
        }

        [HttpGet("active")]
        [Authorize(UserRole.Courier)]
        public IActionResult GetActiveOrder()
        {
            string userId = HttpContext.User.Identity.Name;
            int courierId = int.Parse(userId);
            return Ok(_orderService.GetActiveOrder(courierId));
        }

        [HttpGet("Completed")]
        [Authorize(UserRole.Courier)]
        public IActionResult GetCompleted()
        {
            string userId = HttpContext.User.Identity.Name;
            int courierId = int.Parse(userId);
            return Ok(_orderService.GetCompletedOrders(courierId));
        }

        [HttpGet("pendingAndActive")]
        [Authorize(UserRole.Restaurant)]
        public IActionResult getPendingAndActive()
        {
            string userId = HttpContext.User.Identity.Name;
            int restaurantId = int.Parse(userId);
            return Ok(_orderService.getPendingAndActiveOrders(restaurantId));
        }

        [HttpGet("pendingByCourier")]
        [Authorize(UserRole.Courier)]
        public IActionResult getPendingAndActiveByCourier()
        {
            string userId = HttpContext.User.Identity.Name;
            int courierId = int.Parse(userId);
            return Ok(_orderService.getPendingOrdersByCourier(courierId));
        }

        [HttpGet("GetUnrated")]
        [Authorize(UserRole.Customer)]
        public IActionResult getUnratedOrderByCustomer()
        {
            string userId = HttpContext.User.Identity.Name;
            int customerId = int.Parse(userId);
            return Ok(_orderService.GetUnratedOrder(customerId));
        }

        [HttpPut("updateStatus")]
        [Authorize(UserRole.Courier, UserRole.Restaurant)]
        public IActionResult UpdateOrderStatus(UpdateStatusDto dto)
        {
            
           return Ok(_orderService.UpdateOrderStatus(dto));
        }
      

    }
}
