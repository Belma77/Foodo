using backend.Services.Impl;
using backend.Services.Interfaces;
using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace backend.Controllers
{
    [Route("Location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private ILocationService _locationService;

        public LocationController(ILocationService service)
        {
            _locationService = service;
        }

        [HttpPost]
        public void Add(LocationDto location)
        {
            string userId = HttpContext.User.Identity.Name;
            int customerId = int.Parse(userId);
            location.CustomerId = customerId;
            location.isCurrent = true;
            _locationService.AddCustomerLocation(location, customerId);
        }

        [HttpGet]
        public IActionResult Get()
        {
            string userId = HttpContext.User.Identity.Name;
            int customerId = int.Parse(userId);
            return Ok(_locationService.Get(customerId));
        }

        [HttpPut]
        public void Update(LocationDto location)
        {
            string userId = HttpContext.User.Identity.Name;
            int customerId = int.Parse(userId);
            _locationService.Update(location, customerId);
        }


    }
}
