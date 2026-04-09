import { useEffect, useRef, useCallback, useState } from "react";

// Extend window for YT API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

let apiLoaded = false;
let apiReady = false;
const readyCallbacks: (() => void)[] = [];

function loadYTApi() {
  if (apiLoaded) return;
  apiLoaded = true;

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    apiReady = true;
    readyCallbacks.forEach((cb) => cb());
    readyCallbacks.length = 0;
  };
}

function onApiReady(cb: () => void) {
  if (apiReady) {
    cb();
  } else {
    readyCallbacks.push(cb);
    loadYTApi();
  }
}

interface UseYouTubePlayerOptions {
  onStateChange?: (isPlaying: boolean) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  volume?: number;
}

export function useYouTubePlayer(options: UseYouTubePlayerOptions = {}) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    onApiReady(() => {
      if (!containerRef.current) return;

      // Create a div inside container for YT
      const el = document.createElement("div");
      el.id = "yt-player-" + Date.now();
      containerRef.current.appendChild(el);

      playerRef.current = new window.YT.Player(el.id, {
        height: "1",
        width: "1",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            setReady(true);
            if (optionsRef.current.volume !== undefined) {
              playerRef.current.setVolume(optionsRef.current.volume);
            }
          },
          onStateChange: (e: any) => {
            const state = e.data;
            // YT.PlayerState: ENDED=0, PLAYING=1, PAUSED=2, BUFFERING=3
            if (state === 1) {
              optionsRef.current.onStateChange?.(true);
              startTimeTracking();
            } else if (state === 2) {
              optionsRef.current.onStateChange?.(false);
              stopTimeTracking();
            } else if (state === 0) {
              optionsRef.current.onEnded?.();
              stopTimeTracking();
            }
          },
        },
      });
    });

    return () => {
      stopTimeTracking();
      try {
        playerRef.current?.destroy();
      } catch {}
    };
  }, []);

  const startTimeTracking = useCallback(() => {
    stopTimeTracking();
    intervalRef.current = window.setInterval(() => {
      if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
        const current = playerRef.current.getCurrentTime() || 0;
        const duration = playerRef.current.getDuration() || 0;
        optionsRef.current.onTimeUpdate?.(current, duration);
      }
    }, 250);
  }, []);

  const stopTimeTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const loadVideo = useCallback((videoId: string) => {
    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById(videoId);
    }
  }, []);

  const play = useCallback(() => {
    playerRef.current?.playVideo?.();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo?.();
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo?.(seconds, true);
  }, []);

  const setVolume = useCallback((vol: number) => {
    playerRef.current?.setVolume?.(vol);
  }, []);

  return {
    containerRef,
    ready,
    loadVideo,
    play,
    pause,
    seekTo,
    setVolume,
  };
}
