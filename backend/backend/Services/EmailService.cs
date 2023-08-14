using Data;
using SendGrid.Helpers.Mail;
using SendGrid;
using System;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class EmailService:IEmailService
    {
        private IConfiguration _configuration;
        public EmailService( IConfiguration configuratioin)
        {
            _configuration = configuratioin;    
        }
        
        public async Task SendEmail(string subject, string message)
        {
            string apiKey = _configuration["SendGrid:SendGridKey"]; ;
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("foodo2023@outlook.com", "Foodo"),
                Subject = subject,
                PlainTextContent = message
            };
            msg.AddTo(new EmailAddress("foodo@groups.outlook.com", "foodo"));
            var response = await client.SendEmailAsync(msg);
           
        }
    }
}
