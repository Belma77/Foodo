using AutoMapper;
using backend.Repositories;
using Microsoft.AspNetCore.SignalR;
using backend.Repositories.Impl;
using backend.Utils;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Data.Models.ViewModels;

namespace backend.Services.Impl
{

    public class CourierService 
    {
        private IHubContext<CourierHub> _hub;
        UserRepository _UserRepository;
        IMapper _mapper;
        public CourierService(IHubContext<CourierHub> hub,
                              UserRepository UserRepository, 
                              IMapper mapper) 
        {
            this._hub = hub;
            this._UserRepository = UserRepository;
            this._mapper = mapper;
        }
    public void Register([FromBody] Courier courier)
    {
        byte[] salt = new byte[128 / 8];
        using (var rngCsp = new RNGCryptoServiceProvider())
        {
            rngCsp.GetNonZeroBytes(salt);
        }

        // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
        string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: courier.password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

        courier.password = hashedPassword;
        courier.StoredSalt = salt;
        courier.role = UserRole.COURIER;
            
        _UserRepository.create(courier);
    }
        public ResponseToken Login(UserVM u)
        {
            Courier courier = (Courier)_UserRepository.findByEmail(u.email);
            
            if (courier == null)
                throw new Exception("User not found");
            if (!UserPasswordUtil.verifyUserPassword(u.password, courier.password, courier.StoredSalt))
                throw new Exception("Incorrect password");
            else
            {
                string token = JwtUtil.generateToken(_mapper.Map<UserDto>(courier));
                return new ResponseToken(token);
            }
        }
        public void sendOrderOffer() {
            //receive courier id and 
            _hub.Clients.All.SendAsync("orderOffer", "test mesage");
            
        }

        public void setStatus(int courierId, CourierWorkingStatus status)
        {
            Courier courier = (Courier) _UserRepository.findById(courierId);
            courier.status = status;
            _UserRepository.update(courier);
        }
    }
}

