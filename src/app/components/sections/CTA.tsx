"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import replay from "../../../../public/videos/replay.svg";

type SlideProps = {
  isActive?: boolean;
};

const CTA = ({ isActive = false }: SlideProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch((err) => console.warn("Play error:", err));
      setShowReplay(false);
    } else {
      video.pause();
      video.muted = true;
    }
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setShowReplay(true);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setShowReplay(false);
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        playsInline
      >
        <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751829431/outro-cover_efrttt.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Replay Button */}
      {showReplay && (
        <button
          onClick={handleReplay}
          className="absolute bottom-6 right-20 bg-[#19345A] p-3 rounded-full shadow-md hover:bg-[#0f223f] transition"
          title="Replay"
        >
          <Image src={replay} alt="Replay" width={24} height={24} />
        </button>
      )}
    </section>
  );
};

export default CTA;
