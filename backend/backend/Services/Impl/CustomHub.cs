using backend.Utils;
using Data.Models.Entities;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class CustomHub: Hub
    {
        public override Task OnConnectedAsync()
        {
            //Get user from Http context items
            int id = 1;
            ConnectionMapping.Add(id, Context.ConnectionId);
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

