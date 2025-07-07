/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */


"use client";

import { useEffect, useRef, useCallback } from "react";

interface YouTubePlayerProps {
  videoId: string;
  isActive?: boolean;
  width?: number;
  height?: number;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
  resetOnActive?: boolean;
}

// Extend global window object
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    youtubeAPIReady?: boolean;
    loadingYTScript?: boolean;
  }
}

const YouTubePlayer = ({
  videoId,
  isActive = false,
  width = 640,
  height = 920,
  className = "",
  autoplay = true,
  controls = true,
  muted = false,
  resetOnActive = true,
}: YouTubePlayerProps) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerId = useRef(`youtube-player-${Math.random().toString(36).substr(2, 9)}`);
  const isPlayerReady = useRef(false);
  const previousActiveState = useRef(isActive);

  // Load YouTube IFrame API only once
  const initializeAPI = useCallback(() => {
    if (window.youtubeAPIReady) {
      initializePlayer();
      return;
    }

    if (!window.loadingYTScript) {
      window.loadingYTScript = true;

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        window.youtubeAPIReady = true;
        initializePlayer();
      };
    }
  }, []);

  // Create the YouTube player
  const initializePlayer = useCallback(() => {
    if (!window.YT?.Player || !containerRef.current) return;

    try {
      playerRef.current = new window.YT.Player(playerId.current, {
        height: height.toString(),
        width: width.toString(),
        videoId,
        playerVars: {
          autoplay: 1,
          controls: controls ? 1 : 0,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          fs: 1,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 0,
          mute: muted ? 1 : 0,
          playsinline: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            isPlayerReady.current = true;
            console.log(`✅ Player ready for video: ${videoId}`);

            if (isActive && autoplay) {
              setTimeout(() => {
                try {
                  if (resetOnActive) {
                    event.target.seekTo(0);
                  }
                  event.target.playVideo();
                } catch (err) {
                  console.error("Play error on ready:", err);
                }
              }, 100);
            }
          },
          onStateChange: (event: any) => {
            const state = event.data;
            const states = window.YT.PlayerState;
            if (state === states.PLAYING) {
              console.log(`🎥 Video ${videoId} is playing`);
            } else if (state === states.PAUSED) {
              console.log(`⏸️ Video ${videoId} paused`);
            } else if (state === states.ENDED) {
              console.log(`🔁 Video ${videoId} ended`);
            }
          },
          onError: (event: any) => {
            console.error(`❌ Player error for ${videoId}:`, event.data);
          },
        },
      });
    } catch (err) {
      console.error("Error initializing player:", err);
    }
  }, [videoId, width, height, controls, muted, autoplay, resetOnActive, isActive]);

  // Load API on mount
  useEffect(() => {
    initializeAPI();

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (err) {
          console.log("Error destroying player:", err);
        }
      }
    };
  }, [initializeAPI]);

  // Watch isActive state and control video
 useEffect(() => {
  if (!playerRef.current || !isPlayerReady.current || !autoplay) return;

  if (previousActiveState.current === isActive) return;
  previousActiveState.current = isActive;

  const controlPlayback = async () => {
    try {
      if (isActive) {
        console.log(`▶️ Slide active: playing ${videoId}`);
        await playerRef.current.seekTo(0);
        await playerRef.current.playVideo();
      } else {
        console.log(`⏸️ Slide inactive: pausing ${videoId}`);
        await playerRef.current.pauseVideo();
      }
    } catch (err) {
      console.log("Playback error:", err);
    }
  };

  controlPlayback();
}, [isActive, autoplay, videoId]);


  return (
    <div ref={containerRef} className={className}>
      <div id={playerId.current}></div>
    </div>
  );
};

export default YouTubePlayer;
