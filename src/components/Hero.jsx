import { useEffect, useState } from 'react';
import Header from './Header';
import AnimatedContent from "../components/AnimatedContent"

export default function Hero() {
  const [bgImage, setBgImage] = useState('/stock-1.jpg');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const phrases = ['nur Athletic', 'alles Gold'];
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setBgImage(window.innerWidth < 768 ? '/abb_mobile_licht_hell.png' : '/stock-1.jpg');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentText = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 80 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCharIndex(charIndex + 1);
        setCurrentPhrase(currentText.substring(0, charIndex + 1));
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 5000);
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
      className="bg-cover bg-center h-screen text-white flex flex-col"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
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


      <div className="flex-grow flex flex-col items-center justify-center text-center mb-[400px] sm:mb-[525px] pt-16 sm:pt-0">
        
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
                    <h1 className="text-5xl font-bold">Athletic Binblau</h1>       
                  </AnimatedContent>

                  
                  <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={false}
                  duration={1.2}
                  ease="power3.out"
                  initialOpacity={0.0}
                  animateOpacity
                  scale={1.1}
                  threshold={0.2}
                  delay={0.3}
                  >
                   <p className="text-2xl">
                    Im Talboden <span className="border-r-2 border-white animate-pulse">{currentPhrase}</span>
                  </p>
                  </AnimatedContent>
      </div>
    </section>
  );
}
