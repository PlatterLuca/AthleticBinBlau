// src/pages/Team.jsx
import { useState, useEffect, useRef } from "react";
import Dither from "../components/Dither";
import Silk from "../components/Silk";
import Beams from "../components/Beams";
import SplitText from "../components/SplitText";
import BlurText from "../components/BlurText";
import AnimatedContent from "../components/AnimatedContent";
import ScrollVelocity from "../components/ScrollVelocity";
import GlareHover from "../components/GlareHover";

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

// PNG paths
const SILHOUETTES = {
  Sturm: "/silhouettes/striker.png",
  Mittelfeld: "/silhouettes/midfielder.png",
  Abwehr: "/silhouettes/defender.png",
  Torwart: "/silhouettes/goalkeeper.png",
};

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
  }, []);

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

  // Build stable global indices so IntersectionObserver logic stays sane
  const grouped = groupPlayers();
  const flatOrder = grouped.flatMap(g => g.items.map(p => p.name));
  const globalIndexFor = (name) => flatOrder.indexOf(name);

  // Dice-4 grid wrapper (always 2 columns on desktop)
  const DiceGrid = ({ children, count }) => (
  <div
    className={`
      grid grid-cols-2 place-items-center
      gap-6 sm:gap-8 lg:gap-y-10 lg:gap-x-30
      ${count === 1 ? 'justify-items-center' : ''}
    `}
  >
    {children}
  </div>
);
  // Silhouette card (bigger, centered badge, rounded image corners)
  const SilhouetteCard = ({ position }) => {
  // tweak this to make the header band taller/shorter
  const HEADER_H = "64px"; // 64px = 4rem

  return (
    
    <div className="flex items-center justify-center px-6 py-10">
      
      <div className="relative w-[320px] lg:w-[420px] xl:w-[500px] aspect-[4/5]">
        {/* Card base (clips inner corners) */}
        <div className="absolute inset-0 rounded-3xl bg-[#FDF6F2] backdrop-blur-sm border border-black/10 shadow-sm overflow-hidden" />

        {/* Header band where the pill is perfectly centered */}
        <div
          className="absolute top-5 left-0 right-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ height: HEADER_H }}
        >
          <span className=" items-center justify-center px-10 py-4  text-balck text-2xl font-semibold leading-none">
            {position}
          </span>
        </div>

        {/* Content area: push image down by header height + small gap */}
        <div
          className="absolute inset-0 px-8 pb-10"
          style={{ paddingTop: `calc(${HEADER_H} + 8px)` }}
        >
          <img
            src={SILHOUETTES[position]}
            alt={`${position} silhouette`}
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

  // Alternating section row: silhouette big on one side, players in dice-4 cluster on the other
  // Alternating section row: silhouette + players
const SectionRow = ({ group, side /* 'left' | 'right' */ }) => {
  const singleRow = group.items.length <= 2; // one line of cards?

  return (
    <AnimatedContent
      distance={100}
      direction={side === "left" ? "horizontal" : "vertical"}
      reverse={false}
      duration={1.05}
      ease="power3.out"
      initialOpacity={0.0}
      animateOpacity
      scale={1.03}
      threshold={0.2}
      delay={0.2}
    >
      <section className="relative rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden">
        <div
          className={`
            grid grid-cols-1 lg:grid-cols-2
            ${side === "left" ? "" : "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"}
            ${singleRow ? "lg:min-h-[560px] items-center" : ""}
          `}
        >
          {/* Silhouette column */}
          <div className="px-12 py-10 flex justify-center">
            <SilhouetteCard position={group.position} />
          </div>

          {/* Cards column */}
          <div className="px-12 py-10 flex justify-center">
            <DiceGrid count={group.items.length}>
              {group.items.map((p) => (
                <PlayerCard
                  key={p.name}
                  player={p}
                  globalIndex={globalIndexFor(p.name)}
                />
              ))}
            </DiceGrid>
          </div>
        </div>
      </section>
    </AnimatedContent>
  );
};



  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-50 bg-[#FDF6F2]" />
    
      {/* Desktop Header */}
      {!isMobile && (
        
        <div className="w-full px-12 py-6 flex justify-between items-center">
          <a href="/" className="flex items-center no-underline text-black drop-shadow-sm">
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
        {/* Title */}
        <div className="flex flex-col items-center mb-12">
          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={false}
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
          // DESKTOP: alternating silhouette/video clusters
          <div className="space-y-16">
            <SectionRow group={grouped[0]} side="left" />   {/* Sturm */}
            <SectionRow group={grouped[1]} side="right" />  {/* Mittelfeld */}
            <SectionRow group={grouped[2]} side="left" />   {/* Abwehr */}
            <SectionRow group={grouped[3]} side="right" />  {/* Torwart */}
          </div>
        )}
      </main>
    </>
  );
}
