"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Qmark from "../../../../assets/icons/Qmark.svg";
import logoBlack from "../../../../assets/icons/logo-black.svg";
import replay from "../../../../public/videos/replay.svg";

type SlideProps = {
  isActive?: boolean;
};

const Differentiators = ({ isActive = false }: SlideProps) => {
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
    <section className="flex justify-around">
      {/* Left-side content */}
      <div className="flex flex-col justify-between ml-40">
        <div className="w-fit mt-10">
          <h1 className="text-[#19345A] text-[45px] leading-[60px]">
            WHAT MAKES <br />
            <Image src={Qmark} alt="Q" className="inline" width={40} />
            UANTEX <br /> DIFFERENT?
          </h1>
        </div>

        <div className="w-fit text-[34px] text-[#19345A] leading-[38px] mb-35">
          <div className="space-y-5 pt-14">
            <p>
              <b>
                - Multimodal intelligence: visual, voice,
                <br />
                &nbsp;&nbsp;sensor-based.
              </b>
            </p>
            <p>
              <b>- Personalized avatars trained on your content.</b>
            </p>
            <p>
              <b>- Secure and brand-customizable</b> at every
              <br />
              &nbsp;&nbsp;touchpoint.
            </p>
            <p>
              <b>- Plug-and-play deployment</b> with{" "}
              <b>
                full backend &
                <br />
                &nbsp;&nbsp;on-ground support.
              </b>
            </p>
            <p>
              <b>- Continuous learning</b> with <b>predictive analytics.</b>
            </p>
          </div>
        </div>

        <div>
          <Image src={logoBlack} alt="logo" />
        </div>
      </div>

      {/* Right-side content */}
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
              <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751829691/differentiators_pnjzyl.mp4" type="video/mp4" />
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

export default Differentiators;
