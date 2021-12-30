using backend.Utils;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class CourierHub: Hub<ICourierHub>
    {

        public override Task OnConnectedAsync()
        {
            //Get user from Http context items
            int courierId = 1;
            ConnectionMapping.Add(courierId, Context.ConnectionId);
            Console.WriteLine("Client connected");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception e)
        {
            string name = Context.User.Identity.Name;
            Console.WriteLine("Identity name");
            Console.WriteLine(name);
            //_connections.Remove(name, Context.ConnectionId);

            //return base.OnDisconnected(stopCalled);
            return null ;
        }

    }

}

