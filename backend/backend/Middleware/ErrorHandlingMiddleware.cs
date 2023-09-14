using backend.Services;
using backend.Services.Interfaces;
using Data;
using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace backend.ErrorHandler
{
    public class ErrorHandlingMiddleware:IMiddleware
    {
        private ILogger<ErrorHandlingMiddleware> _logger;
        private MyContext _db;
        private IEmailService _emailService;
        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger, MyContext db, IEmailService emailService)
        {
            _logger=logger;
            _db=db; 
            _emailService=emailService;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next )
        {
            try
            {
                await next(context);
            }

            catch(DomainUnauthorizedException e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await HandleExceptionAsync(context, e);
               
            }

            catch (DomainConflictException e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Conflict;
                await HandleExceptionAsync(context, e);
            }

            catch (DomainForbiddenException e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                await HandleExceptionAsync(context, e);
            }

            catch (DomainInvalidCast e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await HandleExceptionAsync(context, e);
            }

            catch (DomainNotFound e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await HandleExceptionAsync(context, e);
               
            }

            catch (Exception e)
            {
                context.Response.StatusCode = 500;
                await HandleExceptionAsync(context, e);
                string message = $"Hello ,\n following exception has ocurred: {e.Message}.\n Date/Time:{DateTime.Now}. \n Your Foodo Team";

                await _emailService.SendEmailToDevelopers("An exception has occured", message);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            _logger.LogError(exception.Message);

            context.Response.ContentType = "application/json";
            var log= new Log()
            {
                StatusCode = context.Response.StatusCode,
                ExceptionMessage = exception.Message,
                logDate = DateTime.Now,
            };
            await context.Response.WriteAsync(new ExceptionResponse() { 
                ExceptionMessage=exception.Message,
                StatusCode=context.Response.StatusCode,
            }.ToString());  
            _db.Logs.Add(log);
            _db.SaveChanges();
            string message = $"Hello ,\n following exception has ocurred: {exception.Message}.\n Date/Time:{DateTime.Now}. \n Your Foodo Team";
            //await _emailService.SendEmailToDevelopers("An exception has occured", message);//for testing purposes
        }
    }
}
