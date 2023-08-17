using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailToDevelopers(string subject, string message);
        Task SendEmailToCustomers();
    }
}
