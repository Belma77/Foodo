using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.ErrorHandler
{
    public class DomainException:Exception
    {
        public DomainException(string message):base(message){}
    }
    public class DomainUnauthorizedException : DomainException
    {
        public DomainUnauthorizedException(string message):base(message){}
    }
    public class DomainConflictException : DomainException
    {
        public DomainConflictException(string message) : base(message) {}

    }
    public class DomainForbiddenException : DomainException
    {
        public DomainForbiddenException(string message) : base(message){}
    }
}
