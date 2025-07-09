// src/pages/Contact.jsx
import Beams from "../components/Beams";
import BlurText from "../components/BlurText";
import Silk from "../components/Silk";

export default function Contact() {
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

      {/* ──────────── Foreground Content ──────────── */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 text-center">
      <div className="text-center">
      <BlurText
            text="About - Coming Soon!"
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
