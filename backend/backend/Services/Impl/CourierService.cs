﻿using AutoMapper;
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
using backend.ErrorHandler;
using Stripe;
using Order = Data.Models.Entities.Order;
using backend.Services.Interfaces;

namespace backend.Services.Impl
{

    public class CourierService:ICourierService
    {
        private IHubContext<CustomHub> _hub;
        IUserRepository _UserRepository;
        IMapper _mapper;
        string token;
        IOrderRepository _orderRepository;
        IOrderService _orderService;

        public CourierService(IHubContext<CustomHub> hub,
        IUserRepository UserRepository,
        IMapper mapper,
        IOrderRepository orderRepository,
        IOrderService orderService)

        {
            this._hub = hub;
            this._UserRepository = UserRepository;
            this._mapper = mapper;
            this._orderRepository = orderRepository;
            this._orderService = orderService;
        }

        public void Register([FromBody] Courier courier)
        {
            var email = _UserRepository.findByEmail(courier.email);
            if (email != null)
                throw new DomainConflictException("User already exists");
            else
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
                courier.role = UserRole.Courier;
                courier.firstName = courier.firstName;
                courier.lastName = courier.lastName;
                _UserRepository.create(courier);
            }
        }

        public ResponseToken Login(UserVM u)
        {
            try
            {
                Courier courier = (Courier)_UserRepository.findByEmail(u.email);
                if (courier == null)
                    throw new DomainUnauthorizedException("User not found");
                if (!UserPasswordUtil.verifyUserPassword(u.password, courier.password, courier.StoredSalt))
                    throw new DomainUnauthorizedException("Incorrect password");
                else
                {
                    token = JwtUtil.generateToken(_mapper.Map<UserDto>(courier));
                    return new ResponseToken(token);
                }
            }
            catch (Exception)
            {
                throw new DomainUnauthorizedException("User not found");
            }


        }

        public void sendOrderOffer(int orderId) {
            //receive courier id and 
            Order order = _orderRepository.findById(orderId);
            _hub.Clients.All.SendAsync("orderOffer", "test mesage");
        }

        public void setStatus(int courierId, CourierWorkingStatus status)
        {
            Courier courier = (Courier)_UserRepository.findById(courierId);
            courier.status = status;
            _UserRepository.update(courier);
        }

        public void courierAcceptOrder(OrderViewModel order)
        {
            Order Order = _orderRepository.findById(order.Id);
            Courier courier = _UserRepository.findActiveCourier();
            Order.Courier = courier;
            _orderRepository.update(Order);
        }
        

    }
}

