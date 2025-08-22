// src/pages/Team.jsx
import { useState, useEffect, useRef } from "react";
import Dither from "../components/Dither";
import Silk from "../components/Silk";
import Beams from "../components/Beams";
import SplitText from "../components/SplitText";
import BlurText from "../components/BlurText";
import AnimatedContent from "../components/AnimatedContent";
import ScrollVelocity from "../components/ScrollVelocity";

const players = [
  { name: "Clemens", number: "2",  video: "videos-for-playercards/clemens.mp4" },
  { name: "Rene",    number: "3",  video: "videos-for-playercards/rene.mp4" },
  { name: "Elias",   number: "9",  video: "videos-for-playercards/elias.mp4" },
  { name: "Raphi",   number: "11", video: "videos-for-playercards/raphael.mp4" },
  { name: "Paul",    number: "6",  video: "videos-for-playercards/paul.mp4" },
  { name: "Daniel",  number: "16", video: "videos-for-playercards/daniel.mp4" },
  { name: "Matte",   number: "4",  video: "videos-for-playercards/matte.mp4" },
  { name: "Veit",    number: "10", video: "videos-for-playercards/veit.mp4" },
  { name: "Luca",    number: "19", video: "videos-for-playercards/luca.mp4" },
  { name: "Fabi",    number: "1",  video: "videos-for-playercards/fabi.mp4" },
];

export default function Team() {
  const [showNames, setShowNames] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Refs to videos + a Set to remember which ones finished once
  const videoRefs = useRef([]);
  const playedOnce = useRef(new Set()); // stores indexes that have ENDED once
  const started = useRef(new Set());    // stores indexes that have ever started

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFirstVideoEnd = () => setShowNames(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      videoRefs.current.forEach(v => v && v.pause());
      return;
    }

    // Bind per-video end handler (freeze on last frame and mark as playedOnce)
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      vid.onended = () => {
        try {
          // Keep the last frame visible reliably
          vid.pause();
          // "Nudge" to last frame on some browsers that show black on end
          const almostEnd = Math.max(0, vid.duration - 0.05);
          if (!Number.isNaN(almostEnd) && isFinite(almostEnd)) {
            vid.currentTime = almostEnd;
          }
        } catch {}
        playedOnce.current.add(idx);
        if (idx === 0) handleFirstVideoEnd();
      };
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          const vid = entry.target;
          const idx = Number(vid.dataset.index);
          const halfVisible = entry.intersectionRatio >= 0.5;

          if (!halfVisible) {
            // Only pause if it hasn't finished yet
            if (!playedOnce.current.has(idx)) vid.pause();
            return;
          }

          // If it already fully played once, never start again
          if (playedOnce.current.has(idx)) return;

          // If it's visible and hasn't ended, (re)start or resume once
          try {
            vid.muted = true;
            vid.playsInline = true;
            started.current.add(idx);
            await vid.play();
          } catch {
            /* ignore autoplay failures */
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    videoRefs.current.forEach((vid, idx) => {
      if (vid) observer.observe(vid);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-50 bg-[#FDF6F2]" />

      {!isMobile && (
        <div className="w-full px-12 py-6 flex justify-between items-center">
          <a href="/" className="flex items-center no-underline text-balck drop-shadow-sm">
            <img src="/logo.png" alt="Athletic Binblau Logo" className="w-10 mr-3" />
            <span className="font-bold text-lg">| ABB</span>
          </a>
          <nav>
            <ul className="flex gap-8 text-black font-medium text-base">
              <li><a href="/team" className="hover:underline">Team</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      )}

      {/* Content */}
      <main className="relative z-10 py-24 md:py-5 px-6 md:px-20">
        <div className="flex flex-col items-center mb-12">
          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.7}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-black drop-shadow-lg">Das Team</h1>
          </AnimatedContent>
          <div
            className="h-[3px] bg-black mt-2 origin-right"
            style={{
              width: "180px",
              transform: "scaleX(0)",
              animation: "draw-underline 1s ease-out forwards",
              animationDelay: "1s",
            }}
          />
        </div>

        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse
          duration={1.2}
          ease="power3.out"
          initialOpacity={0.0}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 place-items-center">
            {players.map((player, index) => (
              <div key={index} className="team-member text-center">
                <div
                  className="relative w-[160px] sm:w-[200px] md:w-[260px]
                              h-[212px] sm:h-[265px] md:h-[345px]
                              bg-black flex items-center justify-center
                              shadow-md rounded-xl overflow-hidden
                              border-3 md:border-5 border-black"
                >
                  {/* Name overlay after the FIRST video ends */}
                  {showNames && (
                    <div className="absolute bottom-0 w-full z-10 bg-black/80 text-white font-bold text-sm sm:text-base p-1 sm:p-2 flex flex-col rounded-b-xl">
                      <p>{player.name}</p>
                      <p>{player.number}</p>
                    </div>
                  )}

                  {/* Viewport-aware, play-once video */}
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    data-index={index}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    src={player.video}
                    muted
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    controlsList="nofullscreen"
                  />
                </div>
              </div>
            ))}
          </section>
        </AnimatedContent>
      </main>
    </>
  );
}
