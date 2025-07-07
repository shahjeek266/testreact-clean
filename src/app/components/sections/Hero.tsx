"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import replay from "../../../../public/videos/replay.svg";

type SlideProps = {
  isActive?: boolean;
};

const Hero = ({ isActive = false }: SlideProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showRestart, setShowRestart] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Handle slide activation and video control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch((err) => console.warn("Play error:", err));
      setShowRestart(false);
    } else {
      video.pause();
    }
  }, [isActive, isMuted]);

  // Show replay icon on video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setShowRestart(true);
    video.addEventListener("ended", handleEnded);

    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  // Restart video
  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setShowRestart(false);
  };

  // Toggle mute state
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    video.muted = newMuted;
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        playsInline
      >
        <source src="https://res.cloudinary.com/dj2zq210a/video/upload/v1751828939/intro-cover_wkjew9.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Replay Button */}
      {showRestart && (
        <button
          onClick={handleRestart}
          className="absolute bottom-6 right-20 bg-[#19345A] p-3 rounded-full shadow-md hover:bg-[#0f223f] transition"
          title="Restart"
        >
          <Image src={replay} alt="Restart" width={24} height={24} />
        </button>
      )}

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 left-20 bg-[#19345A] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#0f223f] transition text-sm"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </section>
  );
};

export default Hero;
