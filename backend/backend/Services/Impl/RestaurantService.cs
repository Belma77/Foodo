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
    public class RestaurantService
    {
        private UserRepository _UserRepository;
        private readonly IMapper _mapper;
        public RestaurantService(UserRepository userRepository, IMapper mapper)
        {
            _UserRepository = userRepository;
            _mapper = mapper;
        }

        public void register([FromBody] Restaurant res)
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
            res.role = UserRole.RESTAURANT;
            _UserRepository.create(res);
        }
        public ResponseToken Login(UserVM u)
        {
            Restaurant res = (Restaurant)_UserRepository.findByEmail(u.email);
            if (res != null && UserPasswordUtil.verifyUserPassword(u.password, res.password, res.StoredSalt))
            {
                string token = JwtUtil.generateToken(_mapper.Map<UserDto>(res));
                return new ResponseToken(token);
            }
            else
            {
                throw new Exception("User not found");
            }
        }

    }
}


