"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import logoBlack from "../../../../assets/icons/logo-black.svg";
import replay from "../../../../public/videos/replay.svg";

type SlideProps = {
  isActive?: boolean;
};

const SparkTier = ({ isActive = false }: SlideProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isActive;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch((err) => console.warn("Play error:", err));
      setShowRestart(false);
    } else {
      video.pause();
    }
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setShowRestart(true);
    video.addEventListener("ended", handleEnded);

    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setShowRestart(false);
  };

  return (
    <section className="flex justify-around">
      {/* left-side-content */}
      <div className="flex flex-col justify-between ml-40">
        {/* Heading */}
        <div className="w-[600px] justify-between mt-10 flex">
          <h1 className="text-[#19345A] text-[55px] leading-[50px]">
            <span className="font-light">SPARK</span>
            <br />
            <b>TIER</b>
          </h1>
          <h1 className="text-[#19345A] text-[30px] leading-[25px] mt-2">
            <span className="font-bold text-[55px]">202,000</span>
            <span className="font-light"> AED</span>
            <br />
            <span className="text-[20px]">Original price:</span>
            <b className="text-[22px]"> 262,600 AED</b>
          </h1>
        </div>

        {/* Features */}
        <div className="text-[#19345A] text-[22px] leading-[30px] w-[600px] space-y-5">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            className="pb-6"
          >
            {/* Slides */}
            <SwiperSlide className="space-y-6">
              <p className="text-[25px] leading-8 font-bold">
                Kickstart your AI-powered journey with immersive,
                <br /> personalized experiences that set the stage for <br />
                innovation.
              </p>

              <h2 className="text-[38px] font-bold">Features:</h2>

              <p
                className="text-[40px] font-black text-transparent leading-[50px]"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                LIVE EVENT
              </p>

              <div className="space-y-3">
                <div className="space-y-2">
                  <p><b>- <span className="text-[25px]">2</span> interactive AI real-time stations.</b></p>
                  <p><b>- <span className="text-[25px]">2</span> AI Portal Stands with directional signage and looping content</b></p>
                  <p><b>- <span className="text-[25px]">1</span> Meeting Room equipped with Data Collection Unit</b></p>
                  <p><b>- Narrative AI Experience Avatar (Announcements, Intro, Outro)</b></p>
                  <p><b>- Choose one Stage AI Interactive Avatars types available:</b> Speaker AI, Moderator AI, Standalone</p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="space-y-6">
              <p className="text-[25px] leading-8 font-bold">
                Continue the impact with targeted follow-up and insights.
              </p>
              <p
                className="text-[40px] font-black text-transparent leading-[50px]"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                POST-EVENT
              </p>
              <div className="space-y-2">
                <p><b>- Standard analytics on engagement and sessions.</b></p>
                <p><b>- Admin Avatar via QR (10-day access).</b></p>
                <p><b>- Follow-up campaigns via Email, MMS, SMS/WhatsApp.</b></p>
                <p>- <b>AI Feedback Avatar:</b> Collect attendee feedback.</p>
                <p>- <b>Freestyle Avatar:</b> Answers attendee questions (7-day access).</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="space-y-6">
                <h1 className="text-[34px] font-black">Customization:</h1>
                <p className="text-[24px]">
                  Branding, Theme, Station Colors, Avatar Looks & Voice.
                </p>
                <p className="text-[18px]">
                  <b>Note:</b> Client must provide attendee contact data in advance.
                </p>
                <p
                  className="text-[60px] font-black text-transparent leading-[60px]"
                  style={{ WebkitTextStroke: "2px #19345A" }}
                >
                  BEST FOR AI-FIRST EXPERIENCES
                </p>
                <p className="pt-10 font-bold">
                  Extra day: 50% off (101,000 AED) for events outside UAE.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Button */}
        <div className="text-right">
         <a
  href="https://res.cloudinary.com/dj2zq210a/video/upload/v1751962961/Spark_Tier_Show_fq0bcv.mp4"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#19345A] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#0f223f] transition inline-block"
>
  WATCH WALKTHROUGH VIDEO
</a>

        </div>

        {/* logo */}
        <div>
          <Image src={logoBlack} alt="logo" />
        </div>
      </div>

      {/* right-side-content */}
      <div className="flex gap-4 mr-25 max-w-fit relative">
        <div className="flex items-start justify-center mt-8">
          <div className="rounded-xl overflow-hidden w-[640px] h-[920px] relative">
            <video
              ref={videoRef}
              className="w-full h-full"
              autoPlay
              playsInline
              muted
            >
              <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751829722/sparkvideo_hpw2xx.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {showRestart && (
              <button
                onClick={handleRestart}
                className="absolute bottom-[21px] right-[80px] bg-[#19345A] p-3 rounded-full shadow-md hover:bg-[#0f223f] transition"
                title="Restart"
              >
                <Image src={replay} alt="Restart" width={24} height={24} />
              </button>
            )}
          </div>
        </div>

        <div className="self-end">
          <p className="text-[#19345A] leading-8 font-semibold [writing-mode:vertical-rl] rotate-180">
            <span className="text-[32px] font-medium">KEEPING YOUR</span>
            <br />
            <span className="text-[45px] font-black">EVENT A LIVE ...</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SparkTier;
