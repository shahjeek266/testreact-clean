"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoBlack from "../../../../assets/icons/logo-black.svg";
import replay from "../../../../public/videos/replay.svg";

type SlideProps = {
  isActive?: boolean;
};

const LiveExperience = ({ isActive = false }: SlideProps) => {
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
          <h1 className="text-[#19345A] text-[45px] leading-[45px]">
            <span className="font-light">THE&nbsp;</span>
            <b>LIVE</b>
            <br />
            <b>EXPERINCE</b>
          </h1>
        </div>

        <p
          className="text-[60px] font-black text-transparent leading-[60px]"
          style={{ WebkitTextStroke: "2px #19345A" }}
        >
          OUR <br />
          ON-GROUND
          <br />
          ECOSYSTEM
          <br />
          INCLUDES:
        </p>

        <div className="w-fit text-[34px] text-[#19345A] leading-[38px] pb-20">
          <p>
            <b>- Smart registration counters</b> with <b>QID card</b>
            <br />
            &nbsp;&nbsp;<b>personalization</b> and visual + voice assistance.
          </p>
          <p>
            <b>- AI Avatars</b> for <b>live announcements</b> and{" "}
            <b>moderation.</b>
          </p>
          <p>
            <b>- Foyer activations</b> with <b>real-time interaction.</b>
          </p>
          <p>
            <b>- Cinematic AI visual shows.</b>
          </p>
          <p>
            <b>- Intelligent assistants</b> in <b>meeting rooms.</b>
          </p>
          <p>
            <b>- Data collection units</b> that <b>track engagement live.</b>
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
              <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751829694/liveexperience_i3x0ja.mp4" type="video/mp4" />
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

        {/* Vertical Text */}
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

export default LiveExperience;
