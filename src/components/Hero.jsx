import { useEffect, useState } from 'react';

export default function Hero() {
  const [bgImage, setBgImage] = useState('/stock-1.jpg');

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth < 768) {
        setBgImage('/abb_mobile_licht_hell.png');
      } else {
        setBgImage('/stock-1.jpg');
      }
    };

    // Initial check
    updateBackground();

    // Optional: update on resize
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, []);

  return (
    <section
      className="bg-cover bg-center h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="text-center mb-[400px]">
        <h1 className="text-5xl font-bold">Athletic Binblau</h1>
        <p className="text-2xl">Im Talboden nur Athletic!</p>
      </div>
    </section>
  );
}
