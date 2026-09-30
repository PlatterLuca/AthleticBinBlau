import { useEffect, useRef, useState } from 'react';
import AnimatedContent from './AnimatedContent';

export default function KitTeaser() {
  const videoRef = useRef(null);
  const restartTimer = useRef(null);
  const [blackout, setBlackout] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    video.muted = true;
    video.volume = 0;
    video.play().catch(() => {});
    return () => {
      clearTimeout(restartTimer.current);
      video.pause();
    };
  }, []);

  function repeatAfterPause() {
    clearTimeout(restartTimer.current);
    setBlackout(true);
    restartTimer.current = setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      setBlackout(false);
      video.play().catch(() => {});
    }, 1500);
  }

  return (
    <section className="kit-teaser" aria-labelledby="kit-teaser-heading">
      <div className="kit-teaser-layout">
        <AnimatedContent distance={40} duration={0.9}>
          <div className="kit-teaser-copy">
            <p className="kit-teaser-kicker">Athletic Klub Lienz / Trikot 2027</p>
            <h2 id="kit-teaser-heading">Neuer Look.<br /><span>Gleicher Hunger.</span></h2>
            <p className="kit-teaser-description">Blau, Weiß, Gold - für immer treu.</p>
            <p className="kit-teaser-description">2027 tragen wir unsere Farben in neuer Kombination.</p>
            <div className="kit-teaser-release kit-release-desktop">
              <span>Coming soon</span>
              <span className="kit-teaser-confidential">2027 wird Blau. Weiß. Gold.</span>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent distance={50} duration={1} delay={0.15}>
          <div className={`kit-teaser-player${blackout ? ' is-blackout' : ''}`}>
            <video
              ref={videoRef}
              onEnded={repeatAfterPause}
              autoPlay
              muted
              disablePictureInPicture
              playsInline
              preload="metadata"
              width="480"
              height="848"
              aria-label="Teaser für das neue Trikot des Athletic Klub Lienz"
            >
              <source src="/trikot_teaser.mp4" type="video/mp4" />
              Dein Browser unterstützt dieses Video nicht. <a href="/trikot_teaser.mp4">Teaser ansehen</a>
            </video>
          </div>
        </AnimatedContent>
            <div className="kit-teaser-release kit-release-mobile">
              <span>Coming soon</span>
              <span className="kit-teaser-confidential">2027 wird Blau. Weiß. Gold.</span>
            </div>
      </div>
    </section>
  );
}
