import { useEffect, useState } from 'react';

export default function Hero() {
  const [bgImage, setBgImage] = useState('/stock-1.jpg');
  const phrases = ['nur Athletic', 'alles Gold'];
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth < 768) {
        setBgImage('/abb_mobile_licht_hell.png');
      } else {
        setBgImage('/stock-1.jpg');
      }
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, []);

  useEffect(() => {
    const currentText = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 80 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCharIndex(charIndex + 1);
        setCurrentPhrase(currentText.substring(0, charIndex + 1));
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 5000); // pause before deleting
        }
      } else {
        setCharIndex(charIndex - 1);
        setCurrentPhrase(currentText.substring(0, charIndex - 1));
        if (charIndex === 0) {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section
      className="bg-cover bg-center h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="text-center mb-[400px]">
        <h1 className="text-5xl font-bold">Athletic Binblau</h1>
        <p className="text-2xl">
          Im Talboden <span className="border-r-2 border-white animate-pulse">{currentPhrase}</span>
        </p>
      </div>
    </section>
  );
}
