using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("create-checkout-session")]
    public class PaymentController:ControllerBase
    {
        [HttpPost]
        public ActionResult Create()
        {
            var domain = "http://localhost:4200";
          
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    Price = "price_1KxqinKRuZYR6PFuwBiky3Ac",
                    Quantity = 1,
                  },
                },
                Mode = "payment",
                SuccessUrl = domain + "/customer/checkout",
                CancelUrl = domain + "/customer/checkout",
            };
            
            
            var service = new SessionService();
            Session session = service.Create(options);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }
        private int CalculateOrderAmount(Item[] items)
        {
            // Replace this constant with a calculation of the order's amount
            // Calculate the order total on the server to prevent
            // people from directly manipulating the amount on the client
            return 1400;
        }

        public class Item
        {
            [JsonProperty("id")]
            public string Id { get; set; }
        }

        public class PaymentIntentCreateRequest
        {
            [JsonProperty("items")]
            public Item[] Items { get; set; }
        }
    }
}

