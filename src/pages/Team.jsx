// src/pages/Team.jsx
import { useState } from "react";
import Dither from "../components/Dither";
import Silk from "../components/Silk";
import Beams from "../components/Beams";
import SplitText from "../components/SplitText";
import BlurText from "../components/BlurText";

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

  const handleFirstVideoEnd = () => setShowNames(true);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
    setHasAnimated(true);
  };

  return (
    <>
      {/* ─────────────────────  Animated background  ───────────────────── */}
      <div className="fixed inset-0 -z-50">
        {/* Optionally enable Silk or Dither here */}
        <Beams
          beamWidth={2}
          beamHeight={25}
          beamNumber={18}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={45}
        />
      </div>

      {/* ─────────────────────  Foreground content  ───────────────────── */}
      <main className="relative z-10 py-24 px-6 md:px-20">
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
      </main>
    </>
  );
}
