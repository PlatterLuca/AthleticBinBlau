// src/pages/Contact.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Beams from "../components/Beams";
import BlurText from "../components/BlurText";
import Silk from "../components/Silk";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <>
      {/* ──────────── Background Beams ──────────── */}
      <div className="fixed inset-0 -z-50">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* ──────────── Conditional Header ──────────── */}
      {!isMobile && (
        <div className="w-full px-12 py-6 flex justify-between items-center">
          <a href="/" className="flex items-center no-underline text-white drop-shadow-sm">
            <img src="/logo.png" alt="Athletic Binblau Logo" className="w-10 mr-3" />
            <span className="font-bold text-lg">| ABB</span>
          </a>
          <nav>
            <ul className="flex gap-8 text-white font-medium text-base">
              <li><a href="/team" className="hover:underline">Team</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      )}


      {/* ──────────── Foreground Content ──────────── */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 text-center">
        <div className="text-center">
          <BlurText
            text="Contact - Coming Soon!"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg"
          />
        </div>
      </main>
    </>
  );
}
