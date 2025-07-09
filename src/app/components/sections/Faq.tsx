"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoBlack from "../../../../assets/icons/logo-black.svg";
import Qmark from "../../../../assets/icons/Qmark.svg";
import replay from "../../../../public/videos/replay.svg";

type SlideProps = {
  isActive?: boolean;
};

const Faq = ({ isActive = false }: SlideProps) => {
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

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();
    setShowRestart(false);
  };

  return (
    <section className="flex justify-around ">
      {/* left-side-content */}
      <div className="flex flex-col justify-between ml-40">
        {/* Heading */}
        <div className="w-fit mt-10">
          <h1 className=" text-[#19345A] text-[50px] leading-[55px]">
            <br />
            <b className="text-[70px]">
              FA
              <Image src={Qmark} alt="Q" className="inline relative -top-[4px]" width={60} />
              S
            </b>
          </h1>
        </div>

        {/* description */}
        <div className="w-fit text-[22px] text-[#19345A] leading-[30px] mb-48 space-y-14">
          <div className="space-y-2 pt-14">
            <p className=" text-[25px]">
              Custom Branding for avatars, screens, and stations?
              <span className="text-[30px] font-extrabold"> Yes</span>
            </p>
            <p className=" text-[25px]">
              Ready-to-deploy infrastructure?
              <span className="text-[30px] font-extrabold"> Yes</span>
            </p>
            <p className=" text-[25px]">
              Full on-ground & virtual support from our backend?
              <span className="text-[30px] font-extrabold"> Always</span>
            </p>
          </div>
          <div className="space-y-10">
            <h1 className="text-[50px] font-extrabold">QUESTIONS ?</h1>
            <p>
              <span
                className=" text-[70px] font-black text-transparent leading-14 "
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                WE&apos;RE JUST A <br />
                MESSAGE AWAY.
              </span>
            </p>
          </div>
        </div>

        {/* black-logo */}
        <div>
          <Image src={logoBlack} alt="logo" />
        </div>
      </div>

      {/* right-side-content */}
      <div className="flex gap-4 mr-25 max-w-fit ">
        {/* local video */}
  <div className="flex items-start justify-center mt-8">
          <div className="rounded-xl overflow-hidden w-[640px] h-[920px] relative">
            <video
              ref={videoRef}
              className="w-full h-full"
              autoPlay
              playsInline
              muted
            >
              <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751829696/faq_i7ztea.mp4" type="video/mp4" />
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

        {/* text */}
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

export default Faq;
