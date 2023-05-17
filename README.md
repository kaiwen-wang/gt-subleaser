### List of all neighborhoods:

- Inspire Atlanta
- The Mark
- HERE Atlanta
- SQ5
- Paloma West Midtown
- UHouse Midtown
- Modera Midtown
- 100 Midtown
- Westmar Student Lofts
- Live 8 West Apartments
- 935M by ARIUM
- Catalyst Midtown
- The Exchange
- The Flats at Atlantic Station
- The Local on 14th
- Element Condominiums
- Steelworks Atlanta
- Radius West Midtown
- Home Park
- Buckhead
- Downtown
- Old Fourth Ward
- Midtown
- Virginia-Highland
- Ansley Park
- Other

### Major Appliances

- Washing Machine
- Clothes Dryer
- Dishwasher
- Drain Disposal
- Fridge
- Freezer
- Stove
- Stove Hood
- Microwave
- Air Conditioning
- Heater
- Television

### Amenities

- Parking
- Furnished
- Balcony
- Connected Bathroom

### Allowed

- Pets
- Drinking
- Smoking
- Parties

### Safety

- Smoke Alarm
- Fire Extinguisher
- First aid kit
- Carbon monoxide alarm

### Design Inspo

- Google Flights
- Airbnb
- Supabase
- wg-gesucht
- GT Scheduler

### People who have tried this space before

- LiveSomeWhere
  - technology reasons, focus too broad
- studentsublease.com
  - technology reasons, focus too broad
- https://rotatingroom.com/
  - technology reasons, med students, focus too broad
- kopa.com
  - good tech, probably not focused on a specific college
- Cribspot (YC 15, no longer running), Michigan
  - somehow became a property management company/insurance policy
  - https://www.michigandaily.com/news/business/local-housing-company-closing-sight/
  - https://www.tcbusinessnews.com/the-rise-and-fall-of-cribspot/
- Apartments.com berkeley
- Uloop
- Sublet

It really seems like there's no critical mass of apartments anywhere.

**Goal**: corner GT market completely.

**Issue**: Does too many subleases crowd out people's desire to post there? nah, critical mass makes it more likely to be used

"Compared to the broader housing market, college rentals are unique in that many units are booked a semester or more in advance. Furthermore, even when listings are available, they can typically only be found on campus bulletin boards or by walking around a college town and looking for “for rent” signs. All of that can make it difficult for students to find housing, especially on short notice."

People don't care about subleasing to other students. They only care about getting the money. So no need to limit things to student only, unless they want to piss off their roommates.

"Cribspot hopes to change that, by creating the most comprehensive search engine for apartments on or near university campuses. It’s doing that by collecting rental information from thousands of different sources and working directly with landlords who don’t have websites or other ways to find out about their apartments"

What's different now:

- the technology space is different. It's much easier for a single person to build quickly given that they use the right tools

How to make money:

- Promote your own post (possible cause some students are desperate to get out of their lease)
- Get notifications when new posts come out matching your criteria (searchers)
- Let local landlords or apartment complexes advertise (idk because the demand probably outstrips demand around campus)
- Partner with companies in the Atlanta area that have major internship programs
- Charge external people to be able to create an account and see listings (idk if you wanna introduce this variability of non-students, the thing is students want to sublease their place to no matter whom)

How to advertise:

- Posters around school
- Major mailing lists
- News
- Freshman
- Clubs/tabling is probably not a good use of my time
- Transfer student seminar
- Winter graduates
- List of all people interning in a semester

Easiest default:

- Winter gradutes X Spring transfers
- Everyone X Summer interns

Problems:

- leasing to off-campus people
- If people can directly contact someone, do they know where the leasing is coming from?

List of schools to target:

- GT -> Emory -> Georgia State/UGA/Kennesaw (suburban schools may have different rental markets or features)

0 -> 1 -> 2

Zero to one is the hardest.

TODO:

- **DONE** Make the upload page look better
- **DONE** Transmit the upload page form data to supabase
- Edit supabase row level security and so on.
- **DONE** Make sure rows have proper data modeling and normalization.

- **SORTA DONE** Upload images, progress, delete images, multiple images in a flexbox, better looking. Need to make it "draggable." And form validation so that each sublease has an image.
  sorta done

- **DONE** Supabase integrate images with frontend.

- **DONE with SWR?** Caching.

When all of the upload stuff is done, start pulling stuff from the database on the frontend.

- **nope** Skeleton loaders
  Then finally integrate sso, profile contact information, and design for the listing page
  Create a CSV to quickly generate data
  Get images uploaded properly
  Done, sorta.
  Basically whenever an image is uploaded to Airbnb it starts the process instantly. Maybe there's a websocket or something keeping track of stuff. Need to loop.
  Carousel on frontpage

### Posted

- posted moments ago
- posted 58 minutes ago
- posted 8 hours ago
- 36 hours ago
- 2+ days ago

Carousel for front page
-done

Make the display page look better. - done(ish)
gender menu page stuff - done - make the menu clickable on first click - not worth

- upload error page
  - done

Hard stuff that I haven't done yet:

- generating individual pages on database change
  - done ez pz
- getting maxPrice properly done
  - actually important lol
  - lol nvm this easy ez

Hard stuff I will do:

- email confirmation/deletion?
- design on the front page for filter menus

- pagination
  works
  FYI: 2.5k winter graduates on campus.
  filling images properly is probably the biggest pain of the ass

TODO:
lighthouse alt tags
change the bath upload so it stops doing "shared bath"
add an X on the menus for mobile, and don't open the grid when the menu is open
Make the "X" appear when the menu is selected
A little bit of better data validation on the upload page
Check supabase security rules so I don't get spammed
Make it possible for people to disable listings. Maybe through email somehow.
If disabled you can still guess the id
apparently you can break the "number" input by adding in "e"
Total unique views.
Don't leak backend on upload page

Useful features:
MAP
Labels for specific rooms
What floor an apartment building is on
Upload desc MORE CHARACTERS
upload desc spacing?
appliances pictures and state
