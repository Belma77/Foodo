using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Extensions.DependencyInjection;
using SendGrid.Helpers.Mail;
using backend.Services.Impl;
using Stripe;
using Quartz;
using backend.Services.Interfaces;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
              .ConfigureLogging(loggingBuilder =>
              {
                  loggingBuilder.ClearProviders();
                  loggingBuilder
                      .AddDebug()
                      .AddEventLog();
              }).ConfigureServices((hostContext, services) =>
              {
                  // Add the required Quartz.NET services
                  services.AddQuartz(q =>
                  {
                      // Use a Scoped container to create jobs. I'll touch on this later
                      q.UseMicrosoftDependencyInjectionJobFactory();
                      var jobKey = new JobKey("EmailSchedulerService");

                      q.AddJobAndTrigger<EmailSchedulerService>(hostContext.Configuration);
                  });
                  

                  services.AddQuartzHostedService(
                      q => q.WaitForJobsToComplete = true);

                  // other config
              })
              .ConfigureWebHostDefaults(webBuilder =>
              {
                  webBuilder.UseStartup<Startup>();

              });


    }
}
