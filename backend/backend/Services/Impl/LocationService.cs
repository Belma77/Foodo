using AutoMapper;
using backend.ErrorHandler;
using backend.Repositories;
using backend.Services.Interfaces;
using Data.Models.Entities;
using Data.Models.ViewModels;
using System.Collections.Generic;

namespace backend.Services.Impl
{
    public class LocationService:ILocationService
    {
        public ILocationRepository _locationRepository;
        private IMapper _mapper;
        public LocationService(ILocationRepository locationRepository, IMapper mapper)
        {
            _locationRepository = locationRepository;
            _mapper = mapper;
        }

        public void AddCustomerLocation(LocationDto location, int customerId)
        {
            var current=_locationRepository.GetCurrent(customerId);
            if (current != null)
            {
                current.isCurrent = false;
                _locationRepository.Update(current);
            }
            var _location=_mapper.Map<Location>(location);   
            _locationRepository.Add(_location);
        }

        public List<LocationDto> Get(int CustomerId)
        {
            var locations = _locationRepository.GetByCustomer(CustomerId);
            return _mapper.Map<List<LocationDto>>(locations);
          
        }

        public void Update(LocationDto update, int CustomerId)
        {
            var current = _locationRepository.GetCurrent(CustomerId);
            if(current != null)
            {
                current.isCurrent = false;
                _locationRepository.Update(current);
            }
            var _location = _mapper.Map<Location>(update);
            var location = _locationRepository.Get(_location, CustomerId);
            location.isCurrent = true;  
            _locationRepository.Update(location);
           
        }

    }
}
