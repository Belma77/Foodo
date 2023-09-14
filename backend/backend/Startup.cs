using Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Services;
using backend.Services.Impl;
using backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Utils;
using backend.Repositories.Impl;
using backend.middlewares;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using backend.ErrorHandler;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Stripe;
using System.Web.Http;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using System.Diagnostics;
using CorrelationId;
using backend.Services.Interfaces;
using System.Collections.Specialized;
using Quartz;
namespace backend
{
    public class Startup
    {
        public static IConfiguration Configuration { get; set; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public static void Register(HttpConfiguration config)
        {
            // New code
            config.EnableCors();
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddNewtonsoftJson(
                options => options.SerializerSettings.ReferenceLoopHandling =
        Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
            
            services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                options.JsonSerializerOptions.IgnoreNullValues = true;


            });
           
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "backend", Version = "v1" });

                c.AddSecurityDefinition("basic", new OpenApiSecurityScheme
                {
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Name = "JWT Authentication",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Description = "Basic Authorization header using the Bearer scheme."
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "basic"
                                }
                            },
                            new string[] {}
                    }
                });
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => 
                    //builder.AllowAnyOrigin()
                    builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:4200")
                    );
            });

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                var Key = Encoding.UTF8.GetBytes(Configuration["jwt:Key"]);
                o.SaveToken = true;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["JWT:Issuer"],
                    ValidAudience = Configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Key)
                };

                o.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        // If the request is for our hub...
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            (path.StartsWithSegments("/hub")))
                        {
                            // Read the token out of the query string
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            services.AddSignalR().AddJsonProtocol(o =>
            {
                o.PayloadSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
            });
            services.AddSignalR(o =>
            {
                o.EnableDetailedErrors = true;
            });

            services.AddDbContext<MyContext>(options => options.UseSqlServer(Configuration.GetConnectionString("db")));

            services.AddAutoMapper(typeof(Startup));
            services.AddLogging(builder =>
            {
                builder.AddConsole();
                builder.AddDebug();
            });

            //services.AddQuartz(q =>
            //{
            //    q.UseMicrosoftDependencyInjectionScopedJobFactory();

            //    var updateProductsFileJobKey = new JobKey(nameof(JobSchedulerService));
            //    q.AddJob<JobSchedulerService>(opt => opt.WithIdentity(updateProductsFileJobKey));

            //    q.AddTrigger(cfg => cfg.ForJob(updateProductsFileJobKey)
            //    .WithIdentity("UpdateProductsFileJob-Trigger")
            //    .WithSimpleSchedule(x => x.WithIntervalInMinutes(2).RepeatForever()));
            //});

            //services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
            services.AddScoped<CustomHub, CustomHub>();
           
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IReviewsRepository, ReviewsRepository>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<IRestaurantRepository, RestaurantRepository>();

            services.AddScoped<ICourierService, CourierService>();
            services.AddScoped<IOrderService, Services.Impl.OrderService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IRestaurantService, RestaurantService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<ICustomerService, Services.Impl.CustomerService>();
            services.AddScoped<IReviewsService, ReviewsService>();
            services.AddTransient<IEmailService, EmailService>();
<<<<<<< HEAD
            services.AddTransient<IProductService, Services.Impl.ProductService>();
=======
            services.AddScoped<IProductService, Services.Impl.ProductService>();

>>>>>>> 97f3f1d (fix restaurant order listing, lots of smaller fixes)

            services.AddHttpContextAccessor();
            services.AddTransient<ErrorHandlingMiddleware>();


            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            //{
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new
            //        SymmetricSecurityKey
            //        (Encoding.UTF8.GetBytes
            //        (Configuration["jwt:Key"]))
            //    };

            //});
            var properties = new NameValueCollection();

           

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            StripeConfiguration.ApiKey = Configuration.GetValue<string>("Stripe:SecretKey");
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "backend v1"));

            }

            app.UseHttpsRedirection();
            
            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware<ErrorHandlingMiddleware>();
          
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<CustomHub>("/hub");
                endpoints.MapControllers();
            });
              

        }
    }
}
