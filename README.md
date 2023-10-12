Foodo aplikacija je aplikacija za narucivanje i dostavu hrane namjenjena kupcima, kuririma (dostavljacima) i restoranima. 
 
Kupci imaju mogućnost pregleda restorana, odabira narudzbe, biranje lokacije na mapi, online placanja te ostavljanje recenzije.
Restoran koristi aplikaciju za prihvatanje i pregleda trenutno aktivnih narudzbi, te da updateuje status narudzbe kada je spremna, pregleda menija, dodavanja/editovanja proizova kao i editovanja svog korisnickog profila.
Kurir koristi aplikaciju za prihvatanje novih narudzbi, za pregled trenutno aktivnih naruzdbi koje je prihvatio, za pregled informacija o trenutnoj narudzbi kao i za pracenje iste na mapi i updateovanje njenog statusa, te pregled svojih prethodnih aktivnosti.

Login podaci : Customer => customer@gmail.com sifra:password  
                          Restaurant=> mostarlic@gmail.com sifra:password  
                          Courier=>courier@gmail.com sifra:password  


Aplikacija ima 3 interfejsa za 3 vrste usera koji medjusbono komuniciraju, za testiranje flowa aplikacije potrebno je imati 1 prozor u Google Chrome pretrazivacu (na adresi http://localhost:4200/login/courier, 1 prozor incognito mode (ili neki drugi pretrazivac) na adresi http://localhost:4200/login/business te 3. prozor u drugom pretraživaču na adresi http://localhost:4200/login. 
Kada kupac naruči narudžbu, na screenu restorana pojavit će se popup sa dolazećom narudzbom, koju kada prihvati učitava u tabelu "Narudzbe na cekanju". Klikom na dugme "Prihvati" u tabeli "Narudzbe na cekanju" salje se prvom aktivnom kuriru narudzba, te je zato potrebno biti logiran na sva tri interfejsa istovremeno kako je vec pomenuto. Također, treba napomenuti da narudzbu trebate naruciti iz onog restorana kojeg ste logirali na drugom browseru ( u ovom slucaju restoran "Mostarlic").

Prije pokretanja same aplikacije, potrebno je navigirati do foldera u kojem se nalazi api te otvoriti cmd ili neki drugi terminal i pokrenuti komandu: docker-compose -f docker-compose.yml up, za startanje baze.

Nakon toga u VS postaviti backend za Startup project i pokrenuti VS.

Za pokretanje angular aplikacije pokrenuti komandu: npm install; te nakon toga komandu: ng serve. 

