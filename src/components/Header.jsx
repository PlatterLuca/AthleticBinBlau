import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <header className="fixed w-full backdrop-blur bg-blue-800/30 px-4 py-3 flex justify-between items-center z-50">
      <a href="/" className="flex items-center no-underline text-white drop-shadow-sm">
        <img src="/logo.png" alt="Athletic Binblau Logo" className="w-8 mr-2" />
        <span className="font-bold text-base">| ABB</span>
      </a>
      <nav>
        <ul className="flex gap-3">
          <li><Link to="/Team" className="text-white text-sm hover:underline">Team</Link></li>
          <li><Link to="/About" className="text-white text-sm hover:underline">About</Link></li>
          <li><Link to="/Contact" className="text-white text-sm hover:underline">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
