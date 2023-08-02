using Data;
using Data.Models.Entities;
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
        ILogger<ErrorHandlingMiddleware> _logger;
        MyContext _db;
        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger, MyContext db)
        {
            _logger=logger;
            _db=db; 
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
                //await context.Response.WriteAsync(e.Message);
                await HandleExceptionAsync(context, e); 
            }

            catch (DomainConflictException e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Conflict;
                await context.Response.WriteAsync(e.Message);
            }

            catch (DomainForbiddenException e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                await context.Response.WriteAsync(e.Message);
            }

            catch (DomainInvalidCast e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await context.Response.WriteAsync(e.Message);
            }

            catch (DomainNotFound e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await context.Response.WriteAsync(e.Message);
            }

            catch (Exception e)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(e.Message);
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
            await context.Response.WriteAsync(log.ToString());  
            _db.Logs.Add(log);
            _db.SaveChanges();
        }
    }
}
