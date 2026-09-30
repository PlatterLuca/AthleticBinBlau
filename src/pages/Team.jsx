// src/pages/Team.jsx
import { useState, useEffect, useRef } from "react";
import DesktopPlayerCard from "../components/DesktopPlayerCard";
import AnimatedContent from "../components/AnimatedContent";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
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

// Positioning
const POSITION_MAP = {
  Sturm: ["Veit", "Paul", "Raphi"],
  Mittelfeld: ["Elias", "Luca"],
  Abwehr: ["Clemens", "Rene", "Matte", "Daniel"],
  Torwart: ["Fabi"],
};

// Helper: group players by the POSITION_MAP
const groupPlayers = () => {
  const byName = Object.fromEntries(players.map(p => [p.name, p]));
  return Object.entries(POSITION_MAP).map(([pos, names]) => ({
    position: pos,
    items: names.map(n => byName[n]).filter(Boolean),
  }));
};

export default function Team() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Refs
  const videoRefs = useRef([]);         // <video> elements by global index
  const cardRefs  = useRef([]);         // card container elements by global index
  const playedOnce = useRef(new Set()); // indexes that have ENDED once
  const started    = useRef(new Set()); // indexes that have ever started

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      videoRefs.current.forEach(v => v && v.pause());
      return;
    }

    // Per-video handlers: freeze on last frame and mark as playedOnce + show nameplate
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;

      vid.onloadedmetadata = () => {
        const d = vid.duration || 0;
        if (d > 0 && d < 0.2) {
          Promise.resolve().then(() => vid.dispatchEvent(new Event("ended")));
        }
      };

      const handleEnded = () => {
        try {
          vid.pause();
          const dur = vid.duration || 0;
          if (isFinite(dur) && dur > 0.05) {
            const target = Math.max(0, dur - 0.04);
            vid.currentTime = target;  // nudge to last frame
          }
        } catch { /* no-op */ }

        playedOnce.current.add(idx);

        // Reveal this card's nameplate (no React re-render)
        const cardEl = cardRefs.current[idx];
        if (cardEl) cardEl.classList.add("show-name");
      };

      vid.addEventListener("ended", handleEnded, { once: true });
    });

    // IntersectionObserver: play when 50% visible, pause when not (unless already finished)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          const vid = entry.target;
          const idx = Number(vid.dataset.index);
          const halfVisible = entry.intersectionRatio >= 0.5;

          if (!halfVisible) {
            if (!playedOnce.current.has(idx)) vid.pause();
            return;
          }
          if (playedOnce.current.has(idx)) return; // never restart after finished once

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

    videoRefs.current.forEach((vid) => { if (vid) observer.observe(vid); });
    return () => observer.disconnect();
  }, [isMobile]);

  // ───────────────────────────────────────────────────────────────────────────
  // Card component (shared for mobile + desktop)
  const PlayerCard = ({ player, globalIndex }) => (
    <div className="team-member text-center">
      <div
        ref={(el) => (cardRefs.current[globalIndex] = el)}
        className="player-card relative w-[160px] sm:w-[200px] md:w-[220px] lg:w-[240px]
                    h-[212px] sm:h-[265px] md:h-[300px] lg:h-[320px]
                    bg-black flex items-center justify-center
                    shadow-md rounded-xl overflow-hidden
                    border-2 md:border-3 border-black
                    transition-transform duration-300 will-change-transform
                    lg:hover:scale-[1.03]"
      >
        {/* Nameplate: fades in when this card gets .show-name */}
        <div className="nameplate absolute bottom-0 w-full z-10 bg-black/80 text-white font-bold text-xs sm:text-sm md:text-base p-1 sm:p-2 flex flex-col rounded-b-xl opacity-0 transition-opacity duration-500">
          <p>{player.name}</p>
          <p className="opacity-80">{player.number}</p>
        </div>

        <video
          ref={(el) => (videoRefs.current[globalIndex] = el)}
          data-index={globalIndex}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          src={player.video}
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          controlsList="nofullscreen"
          style={{ opacity: 1, willChange: "auto" }}
        />
      </div>
    </div>
  );

  const grouped = groupPlayers();

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-50 bg-[#FDF6F2]" />
    
      {/* Desktop Header */}
      {!isMobile && (
        
        <div className="w-full px-12 py-6 flex justify-between items-center text-[#071A33]">
          <a href="/" className="flex items-center no-underline drop-shadow-sm">
            <img src="/logo.png" alt="Athletic Binblau Logo" className="w-10 mr-3" />
            <span className="font-bold text-lg">| AKL</span>
          </a>
          <nav>
            <ul className="flex gap-8 font-medium text-base">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/team" className="hover:underline">Team</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/contact" className="hover:underline">Kontakt</a></li>
            </ul>
          </nav>
        </div>
      )}

      {/* Content */}
      <div className="team-page-content relative z-10 py-24 md:py-5 px-6 md:px-20">
        {/* Title */}
        <div className="team-page-heading flex flex-col items-center mb-12">
          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={false}
            duration={0.5}
            ease="power3.out"
            initialOpacity={0.0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.1}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-black drop-shadow-lg">Das Team</h1>
          </AnimatedContent>
          <div
            className="h-[3px] bg-black mt-2 origin-right"
            style={{
              width: "180px",
              transform: "scaleX(0)",
              animation: "draw-underline 0.4s ease-out forwards",
              animationDelay: "0.2s",
            }}
          />
        </div>

        {/* MOBILE: simple grid */}
        {isMobile ? (
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
          >
            <section className="grid grid-cols-2 gap-y-10 gap-x-4 place-items-center">
              {players.map((player, index) => (
                <PlayerCard key={player.name} player={player} globalIndex={index} />
              ))}
            </section>
          </AnimatedContent>
        ) : (
          <div className="desktop-squad">
            {grouped.map((group, index) => (
              <section className={`squad-section${index % 2 ? ' squad-section-blue' : ''}`} key={group.position} aria-labelledby={`position-${group.position}`}>
                <div className="squad-section-heading">
                  <h2 id={`position-${group.position}`}>{group.position === 'Torwart' ? 'Tor' : group.position}</h2>
                </div>
                <AnimatedContent distance={35} duration={0.8}>
                  <div className="squad-grid">
                    {group.items.map(player => <DesktopPlayerCard key={player.name} player={player} />)}
                  </div>
                </AnimatedContent>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
