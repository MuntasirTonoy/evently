import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoCalendarClearSharp, IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router";

const Hero = ({ events }) => {
  const slides = events.map((event) => ({
    id: event.id,
    title: event.event_name,
    event_date: event.date, // You might want to format this date
    event_location: event.location,
    subtitle: event.description, // Or use another field like category
    image: event.thumbnail,
    ctaText: "View Details",
    ctaLink: `/event-details/${event.id}`,
  }));

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop={slides.length >= 3}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[80vh] max-h-[800px] w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
              </div>

              {/* Content  */}
              <div className="relative z-10 flex h-full lg:items-end items-center justify-center">
                <div className="container mx-auto md:px-20 px-5 py-10 text-center text-white lg:text-left">
                  <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mb-2 flex items-center lg:justify-start justify-center  gap-2 text-lg md:text-xl">
                    <IoCalendarClearSharp /> {slide.event_date}
                  </p>
                  <p className="mb-2 flex items-center gap-2 lg:justify-start justify-center text-lg md:text-xl">
                    <IoLocationSharp /> {slide.event_location}
                  </p>

                  <Link
                    to={slide.ctaLink}
                    className="inline-block rounded-lg bg-indigo-600 px-8 py-3 font-medium text-white transition hover:bg-indigo-700"
                  >
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
