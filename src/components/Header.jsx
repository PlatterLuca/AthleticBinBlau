import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed w-full backdrop-blur bg-blue-800/30 px-4 py-3 flex justify-between items-center z-50">
      <a href="/" className="flex items-center no-underline text-white drop-shadow-sm">
        <img src="/logo.png" alt="Athletic Binblau Logo" className="w-8 mr-2" />
        <span className="font-bold text-base sm:text-lg">| ABB</span>
      </a>
      <nav>
        <ul className="flex gap-3 sm:gap-6">
          <li><Link to="/Team" className="text-white font-medium text-sm sm:text-base hover:underline">Team</Link></li>
          <li><a href="/" className="text-white font-medium text-sm sm:text-base hover:underline">About</a></li>
          <li><a href="/" className="text-white font-medium text-sm sm:text-base hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
