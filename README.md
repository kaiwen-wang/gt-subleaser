list of all neighborhoods:

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

- House Type

  - Detached House, Apartment, Multiplex, Dorm

- Monthly Price
- Utilities (mark this 0 if included in monthly price)
- Fees (one-time fees for subleasing for example)

- Earliest Move-In
- Earliest Move-Out

  - calculate semester based on this?

- Total Rooms (for example 4)
  Gender of each existing roommate
  How many rooms are Free
  OOOO
  FFF(F)
  Preference for subleaser gender
  (MALE, FEMALE, ANY)

- Total Bathrooms
  XYZABC

[Check if subleaser has their own bathroom] (automatic if bathrooms >= rooms)

Major Appliances
Washing Machine
Clothes Dryer
Dishwasher
Drain Disposal
Fridge
Freezer
Stove
Stove Hood
Microwave
Air Conditioning
Heater
Television

Amenities
Free Parking
Paid Parking
Furnished
Balcony
Connected Bathroom

Allowed
Pets
Drinking
Smoking
Parties

Safety
Smoke Alarm
Fire Extinguisher
First aid kit
Carbon monoxide alarm

Categories:

LOGO

---

Photos
Title
Description
Neighborhood
House Type

---

Monthly Price
Utilities
Fees

---

Earliest Move-In
Latest Move-Out
Semester

---

Total Rooms
Gender Preference
Total Bathrooms

---

Major Appliances
Amenities
Allowed/Disallowed
Safety

Design tools: listed
Design inspo: supabase, airbnb, gt scheduler, google flights
Ai help: GPT4 (debugger and advice) and Midjourney (stock images)
People help:

People who have tried this space before

LiveSomeWhere
-> technology reasons, focus too broad

studentsublease.com
-> technology reasons, focus too broad

https://rotatingroom.com/
-> technology reasons, med students, focus too broad

kopa.com
-> good tech, probably not focused on a specific college

Cribspot (YC 15, no longer running), Michigan
-> somehow became a property management company/insurance policy
https://www.michigandaily.com/news/business/local-housing-company-closing-sight/
https://www.tcbusinessnews.com/the-rise-and-fall-of-cribspot/

Apartments.com berkeley
Uloop
Sublet

etc.
It really seems like there's no critical mass of apartments anywhere. Goal: corner GT market completely.
Issue: Does too many subleases crowd out people's desire to post there?

"Compared to the broader housing market, college rentals are unique in that many units are booked a semester or more in advance. Furthermore, even when listings are available, they can typically only be found on campus bulletin boards or by walking around a college town and looking for “for rent” signs. All of that can make it difficult for students to find housing, especially on short notice."

People don't care about subleasing to students. They only care about getting the money. So no need to limit things.

"Cribspot hopes to change that, by creating the most comprehensive search engine for apartments on or near university campuses. It’s doing that by collecting rental information from thousands of different sources and working directly with landlords who don’t have websites or other ways to find out about their apartments"

What's different now:

- the technology space is different. It's much easier for a single person to build quickly given that they use the right tools

How to make money:

- Promote your own post (possible cause some students are desperate to get out of their lease)
- Get notifications when new posts come out matching your criteria (searchers)
- Let local landlords or apartment complexes advertise (idk because the demand probably outstrips demand)
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
Winter gradutes X Spring transfers

Problems:

- summer glut
  fixed by ncr interns lol
- leasing to off-campus people
- If people can directly contact someone, do they know where the leasing is coming from?

Fall Graduates -> Spring Transfers
Spring Graduates -> Companies

List of schools to target:

- GT -> Emory -> Georgia State/UGA/Kennesaw (suburban schools may have different rental markets or features)

0 -> 1 -> 2

TODO:
Make the upload page look better
done
Make the upload page form logic get saved in the state properly
Done I guess because usestate is not necessary, only client side
Transmit the upload page form data to supabase
Done I guess
Edit supabase row level security and so on.
done
Make sure rows have proper data modeling and normalization.
done

Upload images, progress, delete images, multiple images in a flexbox, better looking
sorta done

Supabase integrate images with frontend.
done

Caching. User sublease progress?
done?

When all of the upload stuff is done, start pulling stuff from the database on the frontend.
Skeleton loaders
nope
Then finally integrate sso, profile contact information, and design for the listing page
Create a CSV to quickly generate data
Get images uploaded properly
Done, sorta.
Basically whenever an image is uploaded to Airbnb it starts the process instantly. Maybe there's a websocket or something keeping track of stuff. Need to loop.
Carousel on frontpage

1 Bed 1 Bath
2 Beds 1 Bath

1 Bed 1 Bath in a 4B/4B
1 Bed Shared Bath in a 2B/2B
2 Beds 1 Bath in a 4B/2B

4 Beds 4 Baths in a 4B/4B

posted moments ago
posted 58 minutes ago
posted 8 hours ago
36 hours ago
2+ days ago

Honestly now that I constrained my scope like crazy I probably just need the following:

Remove the anchor links
done
Fix sort menus and stuff
on the right track
done

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

TODO:
lighthouse alt tags
change the bath upload so it stops doing "shared bath"
add an X on the menus for mobile, and don't open the grid when the menu is open
Make the "X" appear when the menu is selected
A little bit of better data validation on the upload page
Check supabase security rules so I don't get spammed
Make it possible for people to disable listings. Maybe through email somehow.
Do I run into race conditions in indexjs

apparently you can break the "number" input by adding in "e"

FYI: 2.5k winter graduates on campus.

filling images properly is probably the biggest pain of the ass
