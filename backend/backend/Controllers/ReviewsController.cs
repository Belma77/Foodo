using backend.Services.Impl;
using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("Reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private ReviewsService _reviewService;
        public ReviewsController(ReviewsService reviewsService)
        {
            _reviewService = reviewsService;
        }

        [HttpPost]
        public IActionResult Add([FromBody] ReviewsVM reviewsVM)
        {
            _reviewService.Add(reviewsVM);
            return Ok();
        }
    }
}
