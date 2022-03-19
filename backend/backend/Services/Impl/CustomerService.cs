using AutoMapper;
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
        public ResponseToken login(UserVM u)
        {
            Customer customer = (Customer)_userRepository.findByEmail(u.email);
            if (customer == null)
                throw new Exception("User not found");
            if(!UserPasswordUtil.verifyUserPassword(u.password, customer.password, customer.StoredSalt))
                throw new Exception("Incorrect password");
            else { 
                string token = JwtUtil.generateToken(_mapper.Map<UserDto>(customer));
                return  new ResponseToken(token);
            }
            
        }
        
       
    }
}
