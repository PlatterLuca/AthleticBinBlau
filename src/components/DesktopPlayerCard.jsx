import { useEffect, useRef, useState } from 'react';

export default function DesktopPlayerCard({ player }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const posterName = player.video.split('/').pop().replace('.mp4', '.jpg');

  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let finished = false;
    let visible = false;

    function updatePlayback() {
      if (!visible || motion.matches || finished) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    }

    function handleEnded() {
      finished = true;
      video.pause();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      updatePlayback();
    }, { threshold: [0, 0.5] });

    observer.observe(video);
    video.addEventListener('ended', handleEnded);
    motion.addEventListener('change', updatePlayback);
    return () => {
      observer.disconnect();
      video.removeEventListener('ended', handleEnded);
      motion.removeEventListener('change', updatePlayback);
      video.pause();
    };
  }, []);

  return (
    <article
      className="squad-card"
      aria-label={`${player.name}, Nummer ${player.number}`}
    >
      <span className="squad-card-media">
        <img src={`/player-posters/${posterName}`} alt="" loading="lazy" />
        <video
          ref={videoRef}
          className={playing ? 'is-playing' : ''}
          src={`/${player.video}`}
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          aria-hidden="true"
        />
      </span>
      <span className="squad-card-caption"><span>{player.name}</span><span className="squad-number">{player.number}</span></span>
    </article>
  );
}
