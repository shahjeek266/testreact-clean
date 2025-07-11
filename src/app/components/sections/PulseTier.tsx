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

const PulseTier = ({ isActive = false }: SlideProps) => {
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
        <div className="w-[600px] justify-between mt-10 flex  ">
          {/* PACKAGE NAME */}
          <h1 className="text-[#19345A] text-[55px] leading-[50px]">
            <span className="font-light">PULSE</span>
            <br />
            <b>TIER</b>
          </h1>
          {/* PRICE */}
          <h1 className=" text-[#19345A] text-[30px] leading-[25px] mt-2 ">
            <span className="font-bold text-[55px]">350,000</span>
            <span className="font-light ">AED</span>
            <br />
            <span className="text-[20px]">Original price:</span>
            <b className="text-[22px]"> 455,000 AED</b>
          </h1>
        </div>

        {/* feratures */}
        <div className="text-[#19345A] text-[22px] leading-[30px] w-[600px] space-y-5">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            className="pb-6"
          >
            {/* Slide 1: First set of 5 bullet points */}
            <SwiperSlide className="space-y-6">
              {/* discription */}

              <p className="text-[#19345A] text-[24px] leading-8 font-bold">
                The heart of immersive AI, driving real-time interaction and
                audience connection.
              </p>

              <h2 className="text-[38px] font-bold">Features:</h2>

              <p
                className="text-[40px] font-black text-transparent leading-[30px]"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                PRE-EVENT
              </p>
              <p>
                <b>
                  - Advanced registration AI experience with campaign <br />{" "}
                  {"\u00A0"}
                  {"\u00A0"}(Email, MMS, SMS/WhatsApp)
                </b>
              </p>
              <p
                className="text-[40px] font-black text-transparent leading-[30px]"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                LIVE-EVENT
              </p>
              <div className="text-[22px] leading-[30px] space-y-2 ">
                <p>
                  <b>
                    - Foyer Area with{" "}
                    <span className="font-black text-[25px]">2</span>{" "}
                    Registration Units, AI Reception Desk <br />
                    {"\u00A0"}
                    {"\u00A0"} with Team support.
                  </b>
                </p>
                <p>
                  <b>- Personalized QID cards for attendee interaction.</b>
                </p>
                <p>
                  <b>
                    - <span className="font-black text-[25px]">4</span>{" "}
                    interactive AI real-time stations.
                  </b>
                </p>
                <p className="pb-9">
                  <b>
                    - <span className="font-black text-[25px]">6</span> AI
                    Portal Stands with directional signage, media AI portal{" "}
                    <br />
                    {"\u00A0"}
                    {"\u00A0"}(Scheduled looping announcements).
                  </b>
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 2*/}
            <SwiperSlide className="space-y-9 pt-16">
              <p
                className="text-[40px] font-black text-transparent leading-[50px]"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                LIVE-EVENT
              </p>
              <div className="text-[22px] leading-[30px] space-y-4">
                <p>
                  <b>
                    <span className="font-black text-[25px]">- 1</span> AI
                    visual experience show (up to 1 minute).
                  </b>
                </p>
                <p>
                  <b>
                    <span className="font-black text-[25px]">- 1</span> Meeting
                    Room equipped with Data Collection Unit.
                  </b>
                </p>

                <p>
                  <b>
                    - Narrative AI Experience Avatar (Announcements, Intro,{" "}
                    <br />
                    {"\u00A0"}
                    {"\u00A0"} Outro).
                  </b>
                </p>
                <p>
                  <b>
                    -{" "}
                    <span className="font-black">
                      Choose two Stage AI Interactive Avatars types available:
                      <br />
                      {"\u00A0"}
                      {"\u00A0"}
                    </span>
                    Speaker AI, Moderator AI, Standalone Roleplay AI.
                  </b>
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 3*/}
            <SwiperSlide className="space-y-9 ">
              <p
                className="text-[40px] font-black text-transparent leading-[50px]"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                POST-EVENT
              </p>
              <div className="text-[22px] leading-[30px] space-y-4">
                <p>
                  <b>
                    <span className="font-black text-[25px]">
                      - Comprehensive engagement reports
                    </span>{" "}
                    and session summaries.
                  </b>
                </p>
                <p>
                  <b>
                    <span className="font-black text-[25px]">
                      - Event Administration Avatar
                    </span>{" "}
                    accessible via QR code,
                    <br />
                    {"\u00A0"}
                    {"\u00A0"} available for 20 days.
                  </b>
                </p>

                <p>
                  <b>
                    <span className="font-black text-[25px]">
                      - AI Feedback and Freestyle
                    </span>{" "}
                    Avatar for 10 days each with <br />
                    {"\u00A0"}
                    {"\u00A0"} campaign (Email, MMS, SMS/WhatsApp)
                    <br />
                    {"\u00A0"}
                    {"\u00A0"} granting attendees exclusive access to:
                  </b>
                </p>
                <p>
                  <b>
                    <span className="font-black text-[25px]">
                      • AI Feedback Avatar
                    </span>{" "}
                    – A conversational survey experience to capture post-event
                    insights.
                  </b>
                </p>
                <p className="pb-10">
                  <b>
                    <span className="font-black text-[25px]">
                      • Freestyle Avatar
                    </span>{" "}
                    – trained event Avatar, allowing attendees to ask any
                    question related to the sessions, topics, or content shared
                    during the event.
                  </b>
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 4*/}
            <SwiperSlide>
              <div className="space-y-6">
                <h1 className="text-[34px] font-black">Customization :</h1>
                <p className="text-[24px]">
                  Branding, Theme, Station Colors, Avatar Looks & Voice.
                </p>

                <p
                  className=" text-[60px] font-black text-transparent leading-[60px] "
                  style={{
                    WebkitTextStroke: "2px #19345A",
                  }}
                >
                  BEST FOR BRANDS
                  <br />
                  SEEKING
                  <br />
                  FULL-CYCLE EVENT
                  <br />
                  INTELLIGENCE
                </p>
                <p className="pt-10 font-bold">
                  Additional day: 50 % off (125,000 AED{" "}
                  <span className="font-normal">
                    {" "}
                    each extra days ) <br />
                    for the events
                  </span>{" "}
                  outside UAE , logistics charges are applied.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Button */}
        <div className="text-right">
     <a
  href="https://res.cloudinary.com/dj2zq210a/video/upload/v1751962951/Pulse_Tier_Show_r0rv9m.mp4"
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
              <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751829748/pulsevideo_sem60m.mp4" type="video/mp4" />
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
            <span className="text-[32px] font-medium">KEEPING YOUR</span> <br />
            <span className="text-[45px] font-black">EVENT A LIVE ...</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PulseTier;
