import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { EffectFade, Autoplay } from "swiper/modules";
import { sliderInfo } from "../constants";

const HeroSlider = () => {
  return (
    <>
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeeffect={{ crossFade: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={2000}
        style={{ width: "100%", height: "70dvh" }}
      >
        {sliderInfo.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              style={{
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url(${slide.image}) center/cover no-repeat`,

                height: "70dvh",
                important: true,
              }}
              className="p-8 flex items-center"
            >
              <div className=" w-full flex flex-col items-start justify-center md:flex-row md:items-end md:justify-between h-full text-white">
                <div>
                  <h1 className="text-2xl font-sans font-medium md:text-3xl lg:text-4xl md:mb-4">
                    {slide.title}
                  </h1>
                </div>

                <div className="max-w-sm">
                  <p className="text-sm md:text-base lg:text-lg font-sans font-normal">
                    {slide.description}
                    <br />{" "}
                    <span className="text-xs md:text-sm text-gray-200 italic">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae, ipsam impedit corporis quidem placeat suscipit
                      beatae assumenda, nobis consequuntur corrupti atque
                      similique blanditiis in, laborum omnis quia veniam vero
                      fugiat.
                    </span>
                  </p>
                  <button className="bg-amber-600 hover:bg-amber-700 rounded text-white text-sm font-sans font-medium px-4 py-2 mt-4 transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSlider;
