using Data;
using Data.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System.Data.Common;
using System.Linq;
using System.Security.Claims;

namespace backend.Repositories.Impl
{
    public class ReviewsRepository:IReviewsRepository
    {
        private  MyContext _context;
        public ReviewsRepository(MyContext context)
        {
            this._context = context;
        }
        public void AddReview(Reviews review)
        {
            var order=_context.orders.FirstOrDefault(x=>x.Id==review.OrderId);
            review.RestaurantId = order.RestaurantId;           
            _context.reviews.Add(review);
            _context.SaveChanges();
        }
        
    }
}
