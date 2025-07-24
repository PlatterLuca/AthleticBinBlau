import { useState, useEffect } from "react";
import Header from "../components/Header";
import Beams from "../components/Beams";
import BlurText from "../components/BlurText";
import Silk from "../components/Silk";
import AnimatedContent from "../components/AnimatedContent"
import CircularText from '../components/CircularText';
import TextPressure from "../components/TextPressure"

export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLineVisible(true);
    }, 200); // slight delay so it animates after load

    return () => clearTimeout(timeout);
  }, []);

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
      <div className="fixed inset-0 -z-50"></div>
      {/* ──────────── Conditional Header ──────────── */}
      {!isMobile && (
        <div className="w-full px-12 py-6 flex justify-between items-center" style={{ backgroundColor: '#4A90E2' }}>
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
      <main className="relative z-10 min-h-screen px-6 py-20 flex items-start justify-center text-white" style={{ backgroundColor: '#4A90E2' }}>
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-0 relative">

          {/* ──────────── Text Content ──────────── */}
          <div className="flex-1 space-y-8 text-center lg:text-left relative">
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
                  delay={0.3}
                  ><div className="text-lg tracking-wide font-semibold uppercase">
                  ABB
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
                  delay={0.7}
                  ><div className="absolute -top-14 right-0 flex gap-2 text-2xl">
                  {/* blue hollow heart */}
                  <span className="text-transparent [-webkit-text-stroke:1px_black] [text-stroke:1px_black]">
                    ♥
                  </span>
                
                  {/* white filled + outline */}
                  <span className="text-white drop-shadow-sm [-webkit-text-stroke:1px_black] [text-stroke:1px_black]">
                    ♥
                  </span>
                
                  {/* yellow filled + outline */}
                  <span className="text-yellow-400 [-webkit-text-stroke:1px_black] [text-stroke:1px_black]">
                    ♥
                  </span>
                </div>
            </AnimatedContent>
            <div className="relative inline-block">
              <div className="text-center">
              
                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={true}
                  duration={1.2}
                  ease="power3.out"
                  initialOpacity={0.0}
                  animateOpacity
                  scale={1.1}
                  threshold={0.2}
                  delay={0.3}
                  ><h1 className="text-[6rem] leading-none font-light tracking-tight  pl-4">Blau Weiß</h1>
                </AnimatedContent>
              </div>
            
              <div className="text-center">
                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={true}
                  duration={1.2}
                  ease="power3.out"
                  initialOpacity={0.0}
                  animateOpacity
                  scale={1.1}
                  threshold={0.2}
                  delay={0.3}
                  >
                    <div style={{position: 'relative', height: '300px'}}>

              <TextPressure //customized function, no animation after 100 ms for strecheffect. Probably inefficient as fuck
                text="GOLD"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                className="text-[6rem] leading-none font-light tracking-tight  pl-4"
                minFontSize={36}
              />
              </div>
                </AnimatedContent>
              </div>
              
              
            

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
                  delay={0.3}
                  ><p className="text-xl max-w-md mx-auto lg:mx-0">
                  Von vertrauten Hobby-Treffen bis zu ikonischen Spielmomenten
                  </p>
            </AnimatedContent>
            </div>

            {/* Horizontal Line */}
            <div
              className={`hidden lg:block absolute top-[50%] right-[-0.5rem] h-[4px] bg-white z-20 transition-all duration-1000 ease-out origin-left transform`}
              style={{
                width: lineVisible ? '180px' : '0px',
                transform: 'scaleX(0)',
                animation: 'draw-underline 1s ease-out forwards',
                animationDelay: '0.5s',
              }}
            ></div>

          </div>

          {/* ──────────── Image ──────────── */}
          <div className="flex-1 flex justify-left relative -ml-10">
          <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={true}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
          >
          <div><img
              src="Teamfoto.jpeg"
              alt="ABB"
              className="
                rounded-lg object-cover shadow-2xl

                /* Base/mobile: full width of its container */
                w-full  

                /* sm: up to 600px */
                sm:max-w-[600px]

                /* md: up to 800px */
                md:max-w-[800px]

                /* lg: up to 1200px */
                lg:max-w-[1200px]

                /* xl and above: up to 1600px */
                xl:max-w-[3000px]
              "
            /></div>

          </AnimatedContent>
            
          <CircularText
            text="Kleinfeld Turnier · Leisach · 2025 · "
            onHover="speedUp"
            spinDuration={20}
             className="absolute bottom-20 right-20 rotate-12 font-semibold" //change textcolor in CircularText.jsx
          />
          </div>

        </div>
      </main>

      <section className="bg-[#FDF6F2] py-32 px-6 text-neutral-800">
        {/* ───── Horizontal Line (like main) ───── */}
        <div className="flex justify-center mb-16">
          <div
            className="h-[4px] bg-neutral-800 transition-all duration-1000 ease-out origin-left"
            style={{
              width: lineVisible ? '180px' : '0px',
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative">

          {/* ───── LEFT COLUMN ───── */}
          <div className="flex flex-col gap-4 items-start">
            <img
              src="/abb1.jpeg"
              alt="Lip close-up"
              className="rounded-lg shadow-md w-full max-w-[480px] object-cover"
            />
            <p className="text-sm text-neutral-600 max-w-sm pl-1">
              ABB ist kein Look. ABB ist eine Haltung.
            </p>
          </div>

          {/* ───── RIGHT COLUMN ───── */}
          <div className="relative flex flex-col gap-10 pt-20">

            {/* Paragraph */}
            <div className="relative max-w-xl z-10">
              <p className="text-base leading-relaxed border-l-2 border-neutral-400 pl-4">
              Athletic Binblau ist mehr als ein Team – es ist ein Lebensgefühl. Was als lockeres Hobby begann,
              hat sich zu einer Marke entwickelt, die Stil, Teamgeist und Unabhängigkeit vereint. ABB steht
              für Fußballkultur, Gemeinschaft und Identität.
             </p>

              {/* Floating Small Image */}
              <img
                src="/abb4.jpeg"
                alt="Small"
                className="absolute top-0 -right-40 w-32 h-32 rounded-md object-cover shadow-md"
              />
            </div>

            {/* Medium Image */}
            <img
              src="/Teamfoto.jpeg"
              alt="Medium"
              className="w-[400px] rounded-md object-cover shadow-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}
