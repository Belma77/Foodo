using AutoMapper;
using backend.Repositories;
using backend.Utils;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class UserService : IUserService
    {
        private IUserRepository userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this._mapper = mapper;
        }

        public void register(User user)
        {
            Console.WriteLine("dasds");
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: user.password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            user.password = hashedPassword;
            user.StoredSalt = salt;
            user.role = UserRole.RESTAURANT;
            userRepository.create(user);
        }

        public string login(User loginUser)
        {
            User user = userRepository.findByEmail(loginUser.email);
            if (verifyUserPassword(loginUser.password, user.password, user.StoredSalt))
            {
                string token = JwtUtil.generateToken(_mapper.Map<UserDto>(user));
                return token;
            }
            else
            {
                throw new Exception("User not found");
            }
            
        }

        private bool verifyUserPassword(string password, string hashedPassword, byte[] salt)
        {
            string encryptedPassw = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hashedPassword == encryptedPassw;
        }
    }
}
