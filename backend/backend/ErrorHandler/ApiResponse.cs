namespace backend.ErrorHandler
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public bool HasError { get; set; }
        public ApiResponse(int statusCode, bool hasError=true)
        {
            StatusCode = statusCode;
            HasError = hasError;    
        }
    }
}
