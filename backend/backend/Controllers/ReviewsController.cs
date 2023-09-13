using backend.Services.Impl;
using backend.Services.Interfaces;
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
        private IReviewsService _reviewService;
        public ReviewsController(IReviewsService reviewsService)
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
