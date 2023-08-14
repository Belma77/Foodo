using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(string subject, string message);
    }
}
