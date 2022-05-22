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
            ConnectionMapping.Add(Context.User.Identity.Name, Context.ConnectionId);
            Console.WriteLine("Client connected");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception e)
        {
            ConnectionMapping.Remove(Context.User.Identity.Name, Context.ConnectionId);
            return base.OnDisconnectedAsync(e);
        }

    }

}

