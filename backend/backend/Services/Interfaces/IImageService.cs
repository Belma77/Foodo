using Microsoft.AspNetCore.Http;

namespace backend.Services.Interfaces
{
    public interface IImageService
    {
        string saveImage(IFormFile file);
    }
}
