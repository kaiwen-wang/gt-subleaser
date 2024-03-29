### Subleaser Project

![](https://gyazo.com/c019e69a16a9938533c4db7af2d2a82a.gif)

<img width="1009" alt="image" src="https://github.com/kaiwen-wang/gt-subleaser/assets/33988111/80d7d89c-f3b5-4b6c-a458-3098b01ec7bc">
<img width="1007" alt="image" src="https://github.com/kaiwen-wang/gt-subleaser/assets/33988111/e7dc2004-7575-4d9a-94fd-ea1dd46f6e21">

![](https://i.gyazo.com/e77e547baece847f116855532959177c.gif)

Front view: (gif not showing) https://gyazo.com/e77e547baece847f116855532959177c


Quick project I did over the summer.

Areas of improvement included styling, working with forms, communicating with a backend, and thinking about the business area and what people need to sublease things.

Ultimately, I got busy with school and didn't have time to build it into a big platform and felt like Facebook groups served this purpose well enough.

In the future, I'd probably try to host Postgres directly instead of using Supabase.

I found it difficult to structure the project as it got bigger, such as figuring out where to put the backend handlers.

I found styling Next's `Image` to be particularly annoying because you couldn't apply styles easily as it's its own component.

I might work with a different state management in the future, but useContext worked well enough in this case. I am not leaning toward Redux due to my previous experiences with it.

Frontend:
- Radix UI
- HeadlessUI
- NextJS
- Tailwind
- Vercel
- react-icons, heroicons
- Embla Carousel
- Popper
- Leaflet

State:
- useContext
- useSWR

Backend:
- Supabase

