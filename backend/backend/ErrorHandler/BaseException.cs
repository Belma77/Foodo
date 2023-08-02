using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Explorers.Core.Exceptions
{
    [Serializable]
    public class BaseException : Exception
    {
        public List<string> Messages { get; protected set; } = new();

        /// <summary>
        /// Default status code is 400
        /// </summary>
        public virtual int StatusCode { get; } = 400;

        protected BaseException(SerializationInfo info, StreamingContext context) : base(info, context) { }
        protected BaseException(string message) : base(message) { }
        protected BaseException(List<string> messages) : base(string.Join(", ", messages))
        {
            Messages = messages;
        }
    }
}