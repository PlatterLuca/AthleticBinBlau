import { useState, useEffect } from "react";
import Header from "../components/Header";
import Beams from "../components/Beams";
import BlurText from "../components/BlurText";
import Silk from "../components/Silk";
import AnimatedContent from "../components/AnimatedContent";
import CircularText from '../components/CircularText';
import TextPressure from "../components/TextPressure";
import ScrollVelocity from '../components/ScrollVelocity';
import FuzzyText from '../components/FuzzyText';
import BlueCheck from "../components/BlueCheck";


export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmartphone, setIsSmartphone] = useState(window.innerWidth < 640);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLineVisible(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResizeForSmartphones = () => setIsSmartphone(window.innerWidth < 640);
    window.addEventListener('resize', handleResizeForSmartphones);
    return () => window.removeEventListener('resize', handleResizeForSmartphones);
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <>
      {/* Background layers */}
      <div className="fixed bg-[#FDF6F2] inset-0 -z-50"></div>
 

      {/* Desktop Header */}
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

      {/* Desktop Content */}
      {!isMobile && (
      <main className="relative z-10 min-h-screen px-6 py-20 flex items-start justify-center text-white" style={{ backgroundColor: '#4A90E2' }}>
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-0 relative">

          {/* ──────────── Text Content ──────────── */}
          <div className="flex-1 space-y-8 text-center lg:text-left relative">
          <div className="relative inline-block">
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
                  ><div className="absolute -top-10 right-0 flex gap-2 text-2xl">
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

      )}

      {/* Mobile Content ------------------------------------------------------------------------------------------------------- */}
      {/* Mobile Content ------------------------------------------------------------------------------------------------------- */}
      {/* Mobile Content ------------------------------------------------------------------------------------------------------- */}
      {isMobile && (
        <main className="relative z-10">
          <section className="w-full text-white min-h-screen flex flex-col items-center justify-start px-6 pt-20 pb-12" style={{ backgroundColor: '#4A90E2' }}>
          {/* Text Block */}
          <div className="relative w-full max-w-md text-center">
            {/* Animate Hearts */}
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
              <div className="absolute top-0 right-0 flex gap-2 text-2xl">
                <span className="text-transparent [-webkit-text-stroke:1px_black]">♥</span>
                <span className="text-white drop-shadow-sm [-webkit-text-stroke:1px_black]">♥</span>
                <span className="text-yellow-400 [-webkit-text-stroke:1px_black]">♥</span>
              </div>
            </AnimatedContent>

            {/* Headline: Blau Weiß */}
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
              <h1 className="text-2xl sm:text-4xl pt-10 leading-none font-light tracking-tight">Blau Weiß</h1>
            </AnimatedContent>

            {/* GOLD via TextPressure */}
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
              delay={0.5}
            >
              <div className="w-40 sm:w-auto mx-auto">
              <TextPressure
                text="GOLD"
                flex={true}
                alpha={false}
                scale={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                className="leading-none font-light tracking-tight mt-1"
                minFontSize={20}
              />
              </div>
            </AnimatedContent>

            {/* Subtext */}
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
              delay={0.9}
            >
              <p className="mt-4 text-base">
                Von vertrauten Hobby-Treffen bis zu ikonischen Spielmomenten
              </p>
            </AnimatedContent>
          </div>

          
          <div
              className={`relative w-full mt-8 ${
                !isSmartphone ? "max-w-md" : "max-w-sm"
              }`}
            >
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
                <img
                  src="Teamfoto.jpeg"
                  alt="ABB"
                  className="rounded-lg object-cover w-full shadow-2xl"
                />
              </AnimatedContent>
              {!isSmartphone && (
                <CircularText
                  text="Kleinfeld Turnier · Leisach · 2025 · "
                  onHover="speedUp"
                  spinDuration={20}
                  className="text-sm bottom-30 left-40 rotate-12"
                />
              )}
            </div>
            
            </section>


      <section className="w-full bg-[#FDF6F2] py-8 mt-12">

          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.2}
          >
            <div className="max-w-sm mx-auto text-center space-y-4">

  
            <ScrollVelocity
              texts={[
                <>
                  Season 2017 <BlueCheck /> Season 2018 <BlueCheck /> Season 2021 <BlueCheck />
                </>,
                <>
                  Season 2022 <BlueCheck /> Season 2023 <BlueCheck /> Season 2024 <BlueCheck /> Season 2025 <BlueCheck />
                </>,
              ]}
              velocity={30}
              className="custom-scroll-text text-lg"
            />


              {/* 2026 “loading” */}
              <div className="flex items-center justify-center space-x-2 text-2xl">
              
                <FuzzyText 
                baseIntensity={0.075} 
                hoverIntensity={0.2}
                color="#fffff"
                fontSize={24}
                >

                  Season 2026 - loading

                </FuzzyText>
              </div>
              
            </div>
            
          </AnimatedContent>
          
        </section>
            
        </main>
        
      )}
    </>
  );
}
