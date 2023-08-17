using backend.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Quartz;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class EmailSchedulerService:IJob
    {
        private readonly ILogger logger;
        private IEmailService _emailService;

        public EmailSchedulerService(ILogger<EmailSchedulerService> logger, IEmailService emailService)
        {
            this.logger = logger;
            _emailService = emailService;
        }

        public async Task Execute(IJobExecutionContext context)
        {               
            await _emailService.SendEmailToCustomers();
            logger.LogInformation("Greetings from SendMailJob!");
        }
    }
}
