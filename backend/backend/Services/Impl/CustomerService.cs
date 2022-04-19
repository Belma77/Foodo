﻿using AutoMapper;
using backend.ErrorHandler;
using backend.Repositories;
using backend.Repositories.Impl;
using backend.Utils;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;


namespace backend.Services.Impl
{
    public class CustomerService
    {
        private UserRepository _userRepository;
        private readonly IMapper _mapper;
        
        public CustomerService(UserRepository _UserRepository, IMapper mapper)
        {
            _userRepository = _UserRepository;
            _mapper = mapper;
            
        }

        public void register([FromBody] Customer customer)
        {
            
                var exists = _userRepository.findByEmail(customer.email);
                if (exists != null)
                    throw new DomainConflictException("Account is already registered");
                else
                {
                    byte[] salt = new byte[128 / 8];
                    using (var rngCsp = new RNGCryptoServiceProvider())
                    {
                        rngCsp.GetNonZeroBytes(salt);
                    }

                    //derive a 256 - bit subkey(use HMACSHA256 with 100, 000 iterations)
                    string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                        password: customer.password,
                        salt: salt,
                        prf: KeyDerivationPrf.HMACSHA256,
                        iterationCount: 100000,
                        numBytesRequested: 256 / 8));
                    customer.password = hashedPassword;
                    customer.StoredSalt = salt;
                    customer.role = UserRole.CUSTOMER;

                    _userRepository.create(customer);
                }
            
            
        }
        public ResponseToken login(UserVM u)
        {
            try
            {
                Customer customer = (Customer)_userRepository.findByEmail(u.email);
                if (customer == null)
                {
                    throw new DomainUnauthorizedException("User not found");
                }
                if (!UserPasswordUtil.verifyUserPassword(u.password, customer.password, customer.StoredSalt))
                    throw new DomainUnauthorizedException("Incorrect password");
                else
                {
                    string token = JwtUtil.generateToken(_mapper.Map<UserDto>(customer));
                    return new ResponseToken(token);
                }
            }
            catch (DomainUnauthorizedException)
            {
                throw new DomainUnauthorizedException("User not found");
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public User doMe(User u)
        {
            try
            {
                var user = _userRepository.findById(u.Id);
                return user;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

    }

    }

