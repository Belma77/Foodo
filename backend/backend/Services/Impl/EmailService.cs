using Data;
using SendGrid.Helpers.Mail;
using SendGrid;
using System;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using backend.Services.Interfaces;
using System.Collections.Generic;
using backend.Repositories;
using System.Linq;

namespace backend.Services.Impl
{
    public class EmailService : IEmailService
    {
        private IConfiguration _configuration;
        private IUserRepository _userRepository;
        public EmailService(IConfiguration configuratioin, IUserRepository userRepository)
        {
            _configuration = configuratioin;
            _userRepository = userRepository;
        }

        public async Task SendEmailToDevelopers(string subject, string message)
        {
            string apiKey = _configuration["SendGrid:SendGridKey"]; ;
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("foodo2023@outlook.com", "Foodo"),
                Subject = subject,
                PlainTextContent = message,
            };
            msg.AddTo(new EmailAddress("foodo@groups.outlook.com", "foodo"));
            var response = await client.SendEmailAsync(msg);

        }

        public async Task SendEmailToCustomers()
        {
            string apiKey = _configuration["SendGrid:SendGridKey"];
            var client = new SendGridClient(apiKey);
            List<string> emailAdresses = _userRepository.getAll(Data.Models.Enums.UserRole.Customer).Select(x => x.email).ToList();
            var emails = new List<EmailAddress>();
            foreach (var email in emailAdresses)
            {
                emails.Add(new EmailAddress(email));
            }
            var messageText = "Order today using your Foodo app and get 10% off!\n Don't miss your chance to get this monthly discount!\n Foodo team";
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("foodo2023@outlook.com", "Foodo"),
                Subject = "Get 10% off using Foodo!",
                PlainTextContent = messageText,
                Personalizations = new List<Personalization>
                {
                new Personalization
                {
                Tos = emails
                }
            }
            };
            var response = await client.SendEmailAsync(msg);

        }
    }
}
