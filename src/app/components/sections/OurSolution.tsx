"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Qmark from "../../../../assets/icons/Qmark.svg";
import logoBlack from "../../../../assets/icons/logo-black.svg";
import replay from "../../../../public/videos/replay.svg";

type SlideProps = {
  isActive?: boolean;
};

const Solution = ({ isActive = false }: SlideProps) => {
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
      {/* Left content */}
      <div className="flex flex-col justify-between ml-40">
        <div className="w-fit mt-10">
          <h1 className="text-[#19345A] text-[45px] leading-[60px]">
            THE{" "}
            <Image src={Qmark} alt="Q" className="inline" width={40} />UANTEX
            <br /> SOLUTION
          </h1>
        </div>

        <div className="w-fit text-[34px] text-[#19345A] leading-[38px] space-y-24">
          <div className="space-y-5 pt-14">
            <p>
              <b>Quantex</b> delivers the first fully integrated, AI-powered
              <br />
              event assistant.
            </p>

            <p>
              <b>We</b> support your entire event lifecycle with intelligent
              <br />
              avatars that engage, learn, and act in real time.
            </p>

            <p>
              <b>From</b> voice-based registration to AI moderators,
              <br />
              foyer guidance to deep post-event analytics.
            </p>
          </div>

          <p
            className="text-[60px] font-black text-transparent leading-[60px]"
            style={{ WebkitTextStroke: "2px #19345A" }}
          >
            QUANTEX IS <br />
            YOUR EVENT
            <br />
            BRAIN.
          </p>
        </div>

        <div>
          <Image src={logoBlack} alt="logo" />
        </div>
      </div>

      {/* Right-side video */}
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
              <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751829378/solutionvideo_w43nj1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {showRestart && (
              <button
                onClick={handleRestart}
                aria-label="Restart Video"
                title="Restart"
                className="absolute bottom-[21px] right-[80px] bg-[#19345A] p-3 rounded-full shadow-md hover:bg-[#0f223f] transition"
              >
                <Image src={replay} alt="Restart" width={24} height={24} />
              </button>
            )}
          </div>
        </div>

        {/* Vertical text */}
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

export default Solution;
