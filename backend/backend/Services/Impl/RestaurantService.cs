using AutoMapper;
using backend.ErrorHandler;
using backend.Repositories;
using backend.Repositories.Impl;
using backend.Services.Interfaces;
using backend.Utils;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;

using System.Threading.Tasks;
using Order = Data.Models.Entities.Order;

namespace backend.Services.Impl
{
    public class RestaurantService:IRestaurantService
    {
        private IUserRepository _UserRepository;
        private readonly IMapper _mapper;
        private IRestaurantRepository _restaurantRepo;
        private IImageService _imageService;
       
        public RestaurantService(IUserRepository userRepository, IMapper mapper, IImageService imageService, IRestaurantRepository restaurantRepos)
        {
            _UserRepository = userRepository;
            _mapper = mapper;
            _imageService = imageService;
            _restaurantRepo = restaurantRepos;

        }

        public void register(Restaurant res)
        {
            Console.WriteLine(res.phoneNumber);
            var email = _UserRepository.findByEmail(res.email);
            if (email != null)
                throw new DomainConflictException("User already exists");
            else
            {
                byte[] salt = new byte[128 / 8];
                using (var rngCsp = new RNGCryptoServiceProvider())
                {
                    rngCsp.GetNonZeroBytes(salt);
                }

                //derive a 256 - bit subkey(use HMACSHA256 with 100, 000 iterations)
                string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: res.password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));

                res.password = hashedPassword;
                res.StoredSalt = salt;
                res.role = UserRole.Restaurant;

                res.headerImage = res.headerImage;

                _UserRepository.create(res);
            }
        }
        public ResponseToken Login(UserVM u)
        {
            try
            {
                Restaurant res = (Restaurant)_UserRepository.findByEmail(u.email);
                if (res != null && UserPasswordUtil.verifyUserPassword(u.password, res.password, res.StoredSalt))
                {
                    string token = JwtUtil.generateToken(_mapper.Map<UserDto>(res));
                    return new ResponseToken(token);
                }
                else
                {
                    throw new DomainUnauthorizedException("User not found");
                }
            }
            catch(Exception)
            {
                throw new DomainUnauthorizedException("User not found");
            }
           
            
        }

        public List<RestaurantVM> GetRestaurants()
        {
            var restaurants = _restaurantRepo.GetAll();
            return _mapper.Map<List<RestaurantVM>>(restaurants);
        }

        public RestaurantVM GetRestaurant(int id)
        {
            Restaurant restaurant = _UserRepository.findRestaurantById(id);
            return _mapper.Map<RestaurantVM>(restaurant);
        }

        public void editProfile(int userId, IFormFile file, Restaurant r)
        {
            Restaurant restaurant = (Restaurant) _UserRepository.findById(userId);
            restaurant.name = r.name;
            
            if(file != null)
            {
               
                restaurant.headerImage = new string(_imageService.saveImage(file));
            }
            _UserRepository.update(restaurant);
        }
        
    }
}


