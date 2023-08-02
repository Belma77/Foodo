using System.Collections;
using System.Collections.Generic;

namespace backend.ErrorHandler
{
    public class ErrorResponse:ApiResponse
    {
        public IReadOnlyCollection<string> Errors { get; set; }
        public ErrorResponse(int statusCode, IReadOnlyCollection<string> errors):base(statusCode)
        {
            Errors=errors;
        }
    }
}
