import { useState, useEffect } from 'react';

const players = [
  { name: 'Elias', number: '9', video: 'videos-for-playercards/elias.mp4' },
  { name: 'Raphael', number: '11', video: 'videos-for-playercards/raphael.mp4' },
  { name: 'Paul', number: '6', video: 'videos-for-playercards/paul.mp4' },
  { name: 'Daniel', number: '16', video: 'videos-for-playercards/daniel.mp4' },
  { name: 'Matte', number: '4', video: 'videos-for-playercards/matte.mp4' },
  { name: 'Veit', number: '10', video: 'videos-for-playercards/veit.mp4' },
  { name: 'Luca', number: '19', video: 'videos-for-playercards/luca.mp4' },
  { name: 'Fabi', number: '1', video: 'videos-for-playercards/fabi.mp4' },
];

export default function Team() {
  const [showNames, setShowNames] = useState(false);

  // Handle the first video ending
  const handleFirstVideoEnd = () => {
    setShowNames(true);
  };

  return (
    <main className="bg-cover py-12 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-12">Das Team</h2>

      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 place-items-center">
        {players.map((player, index) => (
          <div key={index} className="team-member text-center">
            <div className="relative w-[160px] sm:w-[200px] md:w-[260px] h-[212px] sm:h-[265px] md:h-[345px] bg-blue-400 flex items-center justify-center shadow-md rounded-xl overflow-hidden">
              {/* Name Box */}
              {showNames && (
                <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-sm sm:text-base font-bold text-center p-1 sm:p-2 flex flex-col z-10">
                  <p>{player.name}</p>
                  <p>{player.number}</p>
                </div>
              )}

              {/* Video */}
              <video
                className="absolute w-full h-full object-cover z-0 rounded-xl"
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
  );
}
