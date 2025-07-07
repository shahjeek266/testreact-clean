"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Omark from "../../../../assets/icons/Omark.svg";
import logoBlack from "../../../../assets/icons/logo-black.svg";
import replay from "../../../../public/videos/replay.svg";

interface ProblemStatementProps {
  isActive?: boolean;
}

const ProblemStatement = ({ isActive = false }: ProblemStatementProps) => {
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
        {/* Heading */}
        <div className="w-fit mt-10">
          <h1 className="text-[#19345A] text-[45px] leading-[60px]">
            THE PROBLEM <br /> WITH EVENTS <br />
            T
            <Image
              src={Omark}
              alt="O"
              className="inline relative -top-[4px]"
              width={38}
              height={30}
            />
            DAY
          </h1>
        </div>

        {/* Description */}
        <div className="w-fit text-[34px] text-[#19345A] leading-[38px]">
          <p>
            <b>Engagement</b> is <b>low.</b>
            <br />
            <b>Audiences disconnect.</b>
            <br />
            <b>Data</b> is <b>fragmented.</b>
            <br />
            <b>Follow-up</b> is <b>manual.</b>
            <br />
            <b>Event ROI</b> is hard to measure
            <br />
            and harder to scale.
          </p>
          <p className="mt-15">The result?</p>
          <p
            className="text-[60px] font-black text-transparent leading-[60px]"
            style={{ WebkitTextStroke: "2px #19345A" }}
          >
            HIGH
            <br />
            INVESTMENT,
            <br />
            LIMITED IMPACT.
          </p>
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
              <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751830408/problemvideo_gmlyv9.mp4" type="video/mp4" />
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

export default ProblemStatement;
