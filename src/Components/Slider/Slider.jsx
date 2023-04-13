import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default function Slider({ data }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1.1}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          576: {
            width: 576,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 1,
          },
          1024: {
            width: 1024,
            slidesPerView: 2,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data.map((value, index) => (
          <SwiperSlide key={index}>{value}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
