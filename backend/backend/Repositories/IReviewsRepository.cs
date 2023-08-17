using Data.Models.Entities;

namespace backend.Repositories
{
    public interface IReviewsRepository
    {
        void AddReview(Reviews review);
    }
}
