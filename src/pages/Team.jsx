// src/pages/Team.jsx
import { useState } from "react";
import Dither from "../components/Dither";
import Silk from "../components/Silk";
import Beams from "../components/Beams";
import SplitText from "../components/SplitText";
import BlurText from "../components/BlurText";
import LightRays from "../components/LightRays";
import AnimatedContent from "../components/AnimatedContent"

const players = [
  { name: "Elias",  number: "9",  video: "videos-for-playercards/elias.mp4"   },
  { name: "Raphi",  number: "11", video: "videos-for-playercards/raphael.mp4" },
  { name: "Paul",   number: "6",  video: "videos-for-playercards/paul.mp4"    },
  { name: "Daniel", number: "16", video: "videos-for-playercards/daniel.mp4"  },
  { name: "Matte",  number: "4",  video: "videos-for-playercards/matte.mp4"   },
  { name: "Veit",   number: "10", video: "videos-for-playercards/veit.mp4"    },
  { name: "Luca",   number: "19", video: "videos-for-playercards/luca.mp4"    },
  { name: "Fabi",   number: "1",  video: "videos-for-playercards/fabi.mp4"    },
];

export default function Team() {
  const [showNames, setShowNames] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleFirstVideoEnd = () => setShowNames(true);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
    setHasAnimated(true);
  };

  return (
    <>
      {/* ─────────────────────  Animated background  ───────────────────── */}
      
      <div className="fixed inset-0 -z-50 bg-[#FDF6F2]"></div>
      {/**
      <div className="fixed inset-0 -z-50">
        <Beams
          beamWidth={2}
          beamHeight={25}
          beamNumber={0}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={45}
        />
      </div>

      <div className="fixed inset-0 -z-50">
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
    </div>
      */}
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


      {/* ─────────────────────  Foreground content  ───────────────────── */}
      <main className="relative z-10 py-24 md:py-5 px-6 md:px-20">
        {/** 
        <div className="flex justify-center mb-12">
        <BlurText
            text="Das Team"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg"
            />
        </div>
          */}
          
        <div className="flex flex-col items-center mb-12">
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
                  delay={0.7}
                  >
                    <h1 className="text-4xl sm:text-5xl font-bold text-black drop-shadow-lg">Das Team</h1>       
                  </AnimatedContent>
          <div
            className="h-[3px] bg-black mt-2 origin-right"
            style={{
              width: '180px',
              transform: 'scaleX(0)',
              animation: 'draw-underline 1s ease-out forwards',
              animationDelay: '1s',
            }}
          ></div>
        </div>
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
        
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 place-items-center">
          {players.map((player, index) => (
            <div key={index} className="team-member text-center">
              <div className="relative w-[160px] sm:w-[200px] md:w-[260px]
                              h-[212px] sm:h-[265px] md:h-[345px]
                              bg-black flex items-center justify-center
                              shadow-md rounded-xl overflow-hidden
                              border-3 md:border-5 border-black">
                
                {/* Player name overlay */}
                {showNames && (
                  <div className="absolute bottom-0 w-full z-10
                                  bg-black/80 text-white font-bold
                                  text-sm sm:text-base p-1 sm:p-2 flex flex-col
                                  rounded-b-xl">
                    <p>{player.name}</p>
                    <p>{player.number}</p>
                  </div>
                )}

                {/* Video with matching rounded corners */}
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  src={player.video}
                  muted
                  playsInline
                  autoPlay
                  disablePictureInPicture
                  controlsList="nofullscreen"
                  onEnded={index === 0 ? handleFirstVideoEnd : undefined}
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
