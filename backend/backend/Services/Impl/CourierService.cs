using AutoMapper;
using backend.Repositories;
using backend.Utils;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class CourierService : UserService
    {
        private IHubContext<CourierHub> _hub;

        public CourierService(IHubContext<CourierHub> hub, 
                              IUserRepository userRepository, 
                              IMapper mapper) : base(userRepository, mapper)
        {
            this._hub = hub;
        }

        public void sendOrderOffer() {
            //receive courier id and 
            _hub.Clients.All.SendAsync("orderOffer", "test mesage");
            
        }

        public void setStatus(int courierId, CourierWorkingStatus status)
        {
            Courier courier = (Courier) userRepository.findById(courierId);
            courier.status = status;
            userRepository.update(courier);
        }
    }
}
