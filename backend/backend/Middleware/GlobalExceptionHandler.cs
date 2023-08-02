using backend;
using backend.ErrorHandler;
using Explorers.Core.Exceptions;using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace Middlewares
{
    /// <summary>
    /// Represents custom exception handler
    /// </summary>
    public class GlobalExceptionHandler
    {
        public static ILogger logger;
        public GlobalExceptionHandler(ILogger _logger)
        {
            logger=_logger;
        }
        public static ExceptionHandlerOptions BuildExceptionHandler()
        {
            return new()
            {
                AllowStatusCode404Response = true,
                ExceptionHandler = async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var response = new ApiResponse(context.Response.StatusCode);
                    var jsonResponse = JsonSerializer.Serialize(response);

                    try
                    {
                        var errorHandler = context.Features.Get<IExceptionHandlerFeature>();

                        if (errorHandler != null)
                        {
                            if (errorHandler.Error is BaseException error)
                            {
                                await HandleKnownExceptionAsync(context, error, logger);
                            }
                            else
                            {
                                await HandleExceptionAsync(context, errorHandler.Error, logger);
                            }
                        }
                        else
                        {
                            logger.LogError($"Unhandled exception, couldn't get error: {context}");
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.LogCritical(ex, "Exception thrown in BuildExceptionHandlerAction.");
                        await context.Response.WriteAsync(jsonResponse);
                    }
                }
            };
        }

       
        private static async Task HandleExceptionAsync(HttpContext context, Exception exception, ILogger logger)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            const string message = "We're sorry. Explorers service is temporarily unavailable. Please try your request later.";

            logger.LogError(exception, message);

            var response = new ErrorResponse(context.Response.StatusCode, new List<string> { message });

            var jsonResponse = JsonSerializer.Serialize(response);

            await context.Response.WriteAsync(jsonResponse);
        }

        
        private static async Task HandleKnownExceptionAsync(HttpContext context, BaseException exception, ILogger logger)
        {
            context.Response.ContentType = "application/json";

            context.Response.StatusCode = exception.StatusCode;
           

            var response = new ErrorResponse(context.Response.StatusCode,
                exception.Messages.Any() ? exception.Messages.Select(ex => ex).ToList() : new List<string> { exception.Message });

            var jsonResponse = JsonSerializer.Serialize(response);
            //new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });

            logger.LogError(exception, exception.Message);

            await context.Response.WriteAsync(jsonResponse);
        }
    }
}