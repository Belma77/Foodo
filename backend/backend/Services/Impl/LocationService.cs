using AutoMapper;
using backend.ErrorHandler;
using backend.Repositories;
using Data.Models.Entities;
using Data.Models.ViewModels;
using System.Collections.Generic;

namespace backend.Services.Impl
{
    public class LocationService
    {
        public ILocationRepository _locationRepository;
        private IMapper _mapper;
        public LocationService(ILocationRepository locationRepository, IMapper mapper)
        {
            _locationRepository = locationRepository;
            _mapper = mapper;
        }

        public void AddCustomerLocation(Location location, int customerId)
        {
            var current=_locationRepository.GetCurrent(customerId);
            if (current != null)
            {
                current.isCurrent = false;
                _locationRepository.Update(current);
            }
            _locationRepository.Add(location);
        }

        public List<Location> Get(int CustomerId)
        {
            var location = _locationRepository.GetByCustomer(CustomerId);
            return location;
          
        }

        public void Update(Location update, int CustomerId)
        {
            var current = _locationRepository.GetCurrent(CustomerId);
            if(current != null)
            {
                current.isCurrent = false;
                _locationRepository.Update(current);
            }
            var location = _locationRepository.Get(update, CustomerId);
            location.isCurrent = true;  
            //location.latitude=update.latitude;
            //location.longitude = update.longitude;
            //location.formatedAdress = update.formatedAdress;
            _locationRepository.Update(location);
           
        }

    }
}
