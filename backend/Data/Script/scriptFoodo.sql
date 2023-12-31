SET IDENTITY_INSERT [dbo].[categories] ON 

INSERT [dbo].[categories] ([Id], [name]) VALUES (1, N'Breakfast')
INSERT [dbo].[categories] ([Id], [name]) VALUES (2, N'Pasta')
INSERT [dbo].[categories] ([Id], [name]) VALUES (3, N'Pizza')
INSERT [dbo].[categories] ([Id], [name]) VALUES (4, N'Grill')
INSERT [dbo].[categories] ([Id], [name]) VALUES (5, N'Salad')
INSERT [dbo].[categories] ([Id], [name]) VALUES (6, N'Dessert')
INSERT [dbo].[categories] ([Id], [name]) VALUES (7, N'Chicken')
SET IDENTITY_INSERT [dbo].[categories] OFF

SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([Id], [email], [password], [role], [StoredSalt], [connectiod], [discriminator], [firstName], [lastName], [status], [name], [slug], [avgDeliveryTime], [deliveryCost], [rating], [numberOfReviews], [logoImage], [headerImage], [phoneNumber]) VALUES (1, N'customer@gmail.com', N'JR+KKIrb05djFifbr5/CzxG/An5ONsyI7VHlI3t+Spg=', 0, 0x00000000000000000000000000000000, NULL, 0, N'Customer', N'Customer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[users] ([Id], [email], [password], [role], [StoredSalt], [connectiod], [discriminator], [firstName], [lastName], [status], [name], [slug], [avgDeliveryTime], [deliveryCost], [rating], [numberOfReviews], [logoImage], [headerImage], [phoneNumber]) VALUES (2, N'rs1seminarski2023@gmail.com', N'JR+KKIrb05djFifbr5/CzxG/An5ONsyI7VHlI3t+Spg=', 0, 0x00000000000000000000000000000000, NULL, 0, N'test', N'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[users] ([Id], [email], [password], [role], [StoredSalt], [connectiod], [discriminator], [firstName], [lastName], [status], [name], [slug], [avgDeliveryTime], [deliveryCost], [rating], [numberOfReviews], [logoImage], [headerImage], [phoneNumber]) VALUES (3, N'courier@gmail.com', N'JR+KKIrb05djFifbr5/CzxG/An5ONsyI7VHlI3t+Spg=', 2, 0x00000000000000000000000000000000, NULL, 2, N'Courier', N'Courier', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[users] ([Id], [email], [password], [role], [StoredSalt], [connectiod], [discriminator], [firstName], [lastName], [status], [name], [slug], [avgDeliveryTime], [deliveryCost], [rating], [numberOfReviews], [logoImage], [headerImage], [phoneNumber]) VALUES (4, N'slatkoSlano@gmail.com', N'JR+KKIrb05djFifbr5/CzxG/An5ONsyI7VHlI3t+Spg=', 1, 0x00000000000000000000000000000000, NULL, 1, NULL, NULL, NULL, N'Slatko i Slano', N'slatko-i-slano', N'15-25', 3, 10, 2, NULL, N'Resources/Images/rest.jpg', NULL)
INSERT [dbo].[users] ([Id], [email], [password], [role], [StoredSalt], [connectiod], [discriminator], [firstName], [lastName], [status], [name], [slug], [avgDeliveryTime], [deliveryCost], [rating], [numberOfReviews], [logoImage], [headerImage], [phoneNumber]) VALUES (5, N'mostarlic@gmail.com', N'JR+KKIrb05djFifbr5/CzxG/An5ONsyI7VHlI3t+Spg=', 1, 0x00000000000000000000000000000000, NULL, 1, NULL, NULL, NULL, N'Mostarlic', N'mostarlic', N'15-25', 3, 163, 10, NULL, N'Resources/Images/res2.jpg', NULL)
INSERT [dbo].[users] ([Id], [email], [password], [role], [StoredSalt], [connectiod], [discriminator], [firstName], [lastName], [status], [name], [slug], [avgDeliveryTime], [deliveryCost], [rating], [numberOfReviews], [logoImage], [headerImage], [phoneNumber]) VALUES (6, N'kaldrma@gmail.com', N'Oky5dhjzxqQdTYCTnzpcCxLJ2CyV/fbroKx9JititLw=', 1, 0xC158CF2B768C296C608B6DC30439025E, NULL, 1, NULL, NULL, NULL, N'Kaldrma', NULL, NULL, 3, 111, 87, NULL, N'Resources/Images/res1.jpg', N'123123123')
SET IDENTITY_INSERT [dbo].[users] OFF

SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (1, N'Cury Wok', N'Pileći rezanci u curry sosu', 10, N'Resources/Images/curyWok.jpg', 7, 5)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (2, N'Omlet sa gljivama', N'Jaja, gljive, puter, pavlaka, ajvar', 6, N'Resources/Images/omlet.jpg', 1, 5)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (3, N'Pizza Margharita', N'Sir edamer, gljive, pureća prsa, paradajz sos, začini', 7, N'Resources/Images/pizza.jpg', 3, 5)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (4, N'Palačinke s nutellom', N'tijesto, nutella, sladoled', 7.5, N'Resources/Images/palacinke.jpg', 6, 5)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (5, N'Tuna salata', N'tuna, salata, sos', 10, N'Resources/Images/tuna_salata.jpeg', 5, 5)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (6, N'Pileća salata', N'piletina, zelena salata, luk, gljive', 10, N'Resources/Images/tuna_salata.jpeg', 5, 4)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (7, N'Pasta carbonara', N'Pasta, goveđi pršut', 12, N'Resources/Images/carbonara.jpg', 2, 4)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (8, N'Pizza capricciosa', N'Pizza, sir, salama, kečap', 11, N'Resources/Images/pizza2.jpg', 3, 4)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (9, N'Cheesecake', N'Tijesto, pavlaka, maline', 3.5, N'Resources/Images/cheesecake.jpeg', 6, 4)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (10, N'Piletina s gorgonzolom', N'piletina, gorgonzola, pomfrit', 12, N'Resources/Images/fileti.jpg', 7, 4)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (11, N'Pasta sa 4 vrste sira', N'Pasta, parmezan, tilzit, emmentaler, gorgonzola', 10, N'Resources/Images/pasta_sir.jpg', 2, 6)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (12, N'Batak u soku od limuna', N'Pečeni batak, krompir, sos od limuna', 12, N'Resources/Images/res3.jpg', 4, 6)
INSERT [dbo].[products] ([Id], [name], [description], [price], [image], [CategoryId], [RestaurantId]) VALUES (13, N'Omlet s povrćem', N'jaja, raznovrsno povrće', 5, N'Resources/Images/omlet.jpg', 1, 6)
SET IDENTITY_INSERT [dbo].[products] OFF

SET IDENTITY_INSERT [dbo].[locations] ON 

INSERT [dbo].[locations] ([Id], [latitude], [longitude], [formatedAdress], [floor], [apartmentNo], [note], [CustomerId], [isCurrent]) VALUES (1, 43.3416945, 17.8135613, N'Braće Fejića, Mostar 88000, Bosnia and Herzegovina', NULL, NULL, NULL, 1, 0)
SET IDENTITY_INSERT [dbo].[locations] OFF



