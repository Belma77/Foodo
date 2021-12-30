using backend.Utils;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class CourierService
    {
        private IHubContext<CourierHub> _hub;

        public CourierService(IHubContext<CourierHub> hub)
        {
            this._hub = hub;
        }

        public void sendOrderOffer() {
            //receive courier id and 
            _hub.Clients.All.SendAsync("orderOffer", "test mesage");
            
        }
    }
}
