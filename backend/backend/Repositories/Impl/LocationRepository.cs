using AutoMapper;
using Data;
using Data.Models.Entities;
using Data.Models.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;

namespace backend.Repositories.Impl
{
    public class LocationRepository:ILocationRepository
    {
        public MyContext _db;
         
        private IMapper _mapper;

        public LocationRepository(MyContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;   
        }

        public void Add(Location location)
        {
            _db.locations.Add(location);
            _db.SaveChanges();
        }

        public List<Location> GetByCustomer(int customerId)
        {
            var location = _db.locations.Where(x=>x.CustomerId==customerId).OrderByDescending(x=>x.Id).Take(3).ToList();
            return location;
        }

        public Location GetCurrent(int customerId)
        {
            var location = _db.locations.FirstOrDefault(x => x.CustomerId == customerId&&x.isCurrent);
            return location;
        }

        public Location Get(Location location, int customerId)
        {
            var find = _db.locations.FirstOrDefault(x => x.CustomerId == customerId && x.formatedAdress==location.formatedAdress);
            return find;
        }

        public void Update(Location location)
        {
            
            _db.locations.Update(location);
            _db.SaveChanges();
        }
        

    }
}
