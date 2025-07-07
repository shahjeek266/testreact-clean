/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */


"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";
import { useRef, useState, useCallback } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

import arrowNext from "../../../assets/icons/arrow-right.svg";
import arrowBack from "../../../assets/icons/arrow-left.svg";

interface SwiperWrapperProps {
  children: React.ReactElement<{ isActive?: boolean; slideKey?: string }>[];
}

const SwiperWrapper = ({ children }: SwiperWrapperProps) => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === children.length - 1;

  // Optimized slide change handler
  const handleSlideChange = useCallback(
    (swiper: any) => {
      const newIndex = swiper.activeIndex;
      // Immediate state update
      setActiveIndex(newIndex);
      // Force re-render for immediate prop updates
      swiper.update();
    },
    [activeIndex]
  );

  // Optimized transition start handler for even faster response
  const handleTransitionStart = useCallback((swiper: any) => {
    const newIndex = swiper.activeIndex;
   
    setActiveIndex(newIndex);
  }, []);

  return (
    <div className="relative h-screen w-screen">
      {/* Swiper Instance */}
      <Swiper
        modules={[Keyboard]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        onTransitionStart={handleTransitionStart}
        spaceBetween={0}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        loop={false}
        speed={300} // Faster transition
        className="h-full w-full"
        watchSlidesProgress={true}
      >
{children.map((child, index) => {
  const isSlideActive = index === activeIndex;

  const clonedChild = React.isValidElement(child)
    ? React.cloneElement(child, {
        ...child.props,
        isActive: isSlideActive,
      })
    : child;

  return (
    <SwiperSlide key={`slide-${index}`}>
      {clonedChild}
    </SwiperSlide>
  );
})}


      </Swiper>

      {/* Custom Prev Button */}
      {!isFirst && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-16 top-1/2 -translate-y-1/2 z-50 transition-transform hover:scale-110"
        >
          <Image src={arrowBack} alt="Previous" className="w-16 h-24 " />
        </button>
      )}

      {/* Custom Next Button */}
      {!isLast && (
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-16 top-1/2 -translate-y-1/2 z-50 transition-transform hover:scale-110"
        >
          <Image src={arrowNext} alt="Next" className="w-16 h-24 " />
        </button>
      )}
    </div>
  );
};

export default SwiperWrapper;
