using AutoMapper;
using backend.ErrorHandler;
using backend.Repositories.Impl;
using Data.Models.Entities;
using Data.Models.ViewModels;
using Stripe;

namespace backend.Services.Impl
{
    public class ReviewsService
    {
        private ReviewsRepository _reviewsRepo;
        private IMapper _mapper;
        private OrderRepository _orderRepository;
        public ReviewsService(ReviewsRepository reviewsRepo, IMapper mapper, OrderRepository orderRepository)
        {
            this._reviewsRepo = reviewsRepo;   
            this._mapper = mapper;
            this._orderRepository = orderRepository;
        }
        public void Add(ReviewsVM addReview)
        {
            var order = _orderRepository.findById(addReview.OrderId);
            if ( order == null)
                throw new DomainNotFound("Order not found");

            _reviewsRepo.AddReview(_mapper.Map<Reviews>(addReview));
            order.Rated = true;
            _orderRepository.update(order);
        }
    }
}
