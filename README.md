![Spotter Logo](spotter.png)

a blazing fast, user obsessed, weightlifting focused fitness pal

https://getspotter.io

# front end

https://github.com/danbergelt/spotter-fe

# back end

https://github.com/danbergelt/spotter-be

# pull requests

pull requests welcome!

if you'd like to get in touch, please reach out to dan@danbergelt.com

# who?

👋 i'm dan. i'm a full-stack engineer based in the nyc metropolitan area who primarily works in the ES

# what?

spotter is a fitness pal that seeks to do one thing really, really well: it makes recording, tracking, and analyzing your lifts as painless as possible.

it borrows inspiration from project management apps such as trello, and offers scalability, an intuitive UI, and hand-tailored functionality.

our goal from the beginning has been to make tracking 20 years of lifts as easy as tracking 1 week. if you take the gym seriously, we know you can appreciate that.

# why?

as someone who has invested significant time and energy into the gym, i was surprised to find a lack of minimalist, unintrusive, lifting-centered fitness pals on the market.

many people who lift opt to track by hand, or in a convoluted excel table (_shudders_).

### problems with tracking by hand

tracking by hand is not scalable. finding past workouts is a pain, and recording your workouts is arduous, and subject to formatting blemishes over time. this is not a scalable solution.

### problems with excel

excel is a very powerful tool. however, it is unopinionated by nature, and forces the user to perform non-trivial work up front to set up their tool to their liking.

additionally, it is not optimized for ease of use, it is optimized for complexity. thus, it is fairly bloated when compared to the needs of this specific application. the ui is also not well-suited for mobile

### problems with other fitness pals

when performing research, a common complaint i noticed when discussing competitors was **too many features.**

often, users do not need a lifting tracker, cardio tracker, sample workouts, and a meal planner in one app. too many features creates a complex ui and bloat.

# how?

### front end

on the front end, spotter's views are built with **react**, and state is managed in **redux**. spotter is written almost entirely in **typescript**, and is tested with **jest** and **react testing library.**

the front end must pass a **travis ci** build pre-merge and is deployed to **netlify**

### back end

spotter is written on the back end in **node** and **express.** since workouts can take a variety of shapes, and most data can be nullable, data is persisted into a **mongodb** instance.

the back end is containerized with **docker** and **docker-compose**, must pass a **travis ci** build pre-merge, and is deployed to a **digital ocean** vps

### learn more

if you'd like to peek at the code, or learn more about the different pieces of the application, links are at the top of this document.
