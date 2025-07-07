"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoBlack from "../../../../assets/icons/logo-black.svg";
import replay from "../../../../public/videos/replay.svg";

type SlideProps = {
  isActive?: boolean;
};

const PackagesIntro = ({ isActive = false }: SlideProps) => {
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
          <h1 className="text-[#19345A] text-[55px] leading-[45px]">
            <span className="font-light">CHOOSE YOUR</span>
            <br />
            <b>TIER</b>
          </h1>
        </div>

        <div className="w-fit text-[22px] text-[#19345A] leading-[30px] mb-48">
          <div className="space-y-10 pt-14">
            <p>
              We&apos;ve created <br />
              <span
                className="text-[70px] font-black text-transparent"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                3
              </span>
              <b className="text-[70px] leading-11">
                POWER <br />
                PACKED <br />
              </b>
              <span
                className="text-[70px] font-black text-transparent leading-11"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                TIERS
              </span>
              <br />
              to match your ambition.
            </p>
            <p>
              All include Quantex technology, avatars, support, and <br />
              post-event tools.
            </p>
            <p>
              <span
                className="text-[70px] font-black text-transparent leading-11"
                style={{ WebkitTextStroke: "2px #19345A" }}
              >
                30%
              </span>
              <span className="text-[70px] font-bold"> OFF</span>
              <br />
              all packages{" "}
              <span className="font-extrabold">until December 2025, 31.</span>
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
              <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751829704/packagesintro_ocdsld.mp4" type="video/mp4" />
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

export default PackagesIntro;
