// src/pages/Contact.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Silk from "../components/Silk";
import BlurText from "../components/BlurText";
import AnimatedContent from "../components/AnimatedContent";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
const IG_HANDLE = "_athletic_binblau";
const IG_URL = `https://instagram.com/${IG_HANDLE}`;
const EMAIL = "AthleticKlubLienz@gmx.at";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ Typing effect: "Schreib uns eine DM"
  const fullDMText = "Schreib uns eine DM";
  const [typedDM, setTypedDM] = useState("");
  const [isDone, setIsDone] = useState(false); // track typing completion

  // copy-to-clipboard state
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let i = 0;
    const startDelay = 1500; // delay before typing starts (ms)
    const speed = 80;        // typing speed (ms per char)

    const starter = setTimeout(() => {
      const typer = setInterval(() => {
        i += 1;
        setTypedDM(fullDMText.slice(0, i));
        if (i >= fullDMText.length) {
          clearInterval(typer);
          setIsDone(true); // ✅ mark typing as finished
        }
      }, speed);
    }, startDelay);

    return () => clearTimeout(starter);
  }, []);

  const onCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };
  return (
    <>
      {/* ──────────── Background ──────────── */}
      <div className="fixed inset-0 -z-50 bg-[#4A90E2]"></div>

      {/* ──────────── Header (desktop only) ──────────── */}
      {!isMobile && (
        <div className="w-full text-white px-12 py-6 flex justify-between items-center">
          <a href="/" className="flex items-center no-underline drop-shadow-sm">
            <img src="/logo.png" alt="Athletic Binblau Logo" className="w-10 mr-3" />
            <span className="font-bold text-lg">| ABB</span>
          </a>
          <nav>
            <ul className="flex gap-8 font-medium text-base">
              <li><a href="/team" className="hover:underline">Team</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/contact" className="hover:underline underline decoration-2">Contact</a></li>
            </ul>
          </nav>
        </div>
      )}

      {/* ──────────── Page Content ──────────── */}
      <main className="relative z-10 min-h-screen py-24 md:py-5 px-6 md:px-20">
        <div className="flex flex-col items-center mb-12">
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
            delay={0.7}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">Contact</h1>
          </AnimatedContent>
          <div
            className="h-[3px] bg-white mt-2 origin-right"
            style={{
              width: "180px",
              transform: "scaleX(0)",
              animation: "draw-underline 1s ease-out forwards",
              animationDelay: "1s",
            }}
          />
        </div>

        {/* ──────────── Typed line + IG feed ──────────── */}
        <section className="max-w-5xl mx-auto mt-10">
          
          <AnimatedContent
              distance={100}
              direction="horizontal"
              reverse={true}
              duration={1.2}
              ease="power3.out"
              initialOpacity={0.0}
              animateOpacity
              scale={1.1}
              threshold={0.2}
              delay={1.2}
            >
              <div className="absolute top-0 left-0 flex gap-2 text-2xl">
                <span className="text-transparent [-webkit-text-stroke:1px_black]">♥</span>
                <span className="text-white drop-shadow-sm [-webkit-text-stroke:1px_black]">♥</span>
                <span className="text-yellow-400 [-webkit-text-stroke:1px_black]">♥</span>
              </div>
            </AnimatedContent>

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
              delay={1.2}
            >
              <div className="absolute top-0 right-0 flex gap-2 text-2xl">
                <span className="text-transparent [-webkit-text-stroke:1px_black]">♥</span>
                <span className="text-white drop-shadow-sm [-webkit-text-stroke:1px_black]">♥</span>
                <span className="text-yellow-400 [-webkit-text-stroke:1px_black]">♥</span>
              </div>
            </AnimatedContent>
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
            delay={0.7}
          >
          {/* ✅ The typed sentence with cursor that disappears */}
          <p className="text-center text-sm mb-6 text-white">
            <span>{typedDM}</span>
            {!isDone && (
              <span
                className="border-r-2 border-white ml-1 inline-block align-middle"
                style={{ animation: "1s step-end infinite",
                         
                 }}
              >
              </span>
            )}
          </p>

          {/* Instagram Feed */}
          
            <div className="relative w-full" style={{ paddingTop: "130%" }}>
              <iframe
                src="https://lightwidget.com/widgets/b117544e658a5e9a942a01c906235be8.html"
                allowTransparency={true}
                className="absolute inset-0 w-full h-full rounded-2xl shadow-md lightwidget-widget bg-[#FDF6F2]"
                style={{ border: 0, overflow: "hidden" }}
                loading="lazy"
                title="Instagram Feed"
              ></iframe>
            </div>
          </AnimatedContent>

          <AnimatedContent
          distance={80}
          direction="vertical"
          reverse={false}
          duration={1.0}
          ease="power3.out"
          initialOpacity={0.0}
          animateOpacity
          scale={1.02}
          threshold={0.2}
          delay={0.4}
        >
          <div className="mt-8 sm:mt-10 mx-auto max-w-3xl">
            <div
              className="
                rounded-2xl shadow-lg p-5 sm:p-6
                bg-[#6FB1F0]/30 text-white
                sm:border sm:border-white/20 sm:bg-white/10 sm:backdrop-blur
              "
            >
              <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                {/* Left: icon + text */}
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    aria-hidden="true"
                    className="opacity-90"
                    fill="currentColor"
                  >
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.236l7.382 5.9a1 1 0 001.236 0L20 8.236V18H4z" />
                  </svg>
                  <div>
                    <div className="text-sm opacity-90">Oder per E-Mail</div>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-lg sm:text-xl font-semibold underline decoration-2 underline-offset-4 break-all hover:opacity-90"
                      aria-label={`E-Mail an ${EMAIL} senden`}
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>

                {/* Right: actions */}
                <div className="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="
                      rounded-xl px-4 py-2 font-semibold shadow text-center
                      bg-white text-black
                      hover:bg-white/80 active:scale-[0.99] transition
                      w-full sm:w-auto
                    "
                  >
                    Mail schreiben
                  </a>
                  <button
                    type="button"
                    onClick={onCopyEmail}
                    className="
                      rounded-xl px-4 py-2 font-medium text-center
                      border border-white/30 hover:bg-white/10
                      active:scale-[0.99] transition
                      w-full sm:w-auto
                    "
                  >
                    {copied ? "Kopiert!" : "Kopieren"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>

        </section>
      </main>

      {/* caret blink animation */}
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation: blink"] { animation: none !important; }
        }
      `}</style>
    </>
  );
}
