using Data.Models.Dtos;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        UserDto doMe(int userId);
    }
}
