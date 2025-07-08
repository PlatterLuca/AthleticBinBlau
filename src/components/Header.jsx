import { Link } from 'react-router-dom';

export default function Header() {
    return (
      <header className="flex justify-between items-center px-6 py-2 bg-blue-800">
        <a href="/" className="flex items-center no-underline text-white">
          <img src="/logo.png" alt="Athletic Binblau Logo" className="w-8 mr-2" />
          <span className="font-bold text-lg">| ABB</span>
        </a>
        <nav>
          <ul className="flex gap-6">
            <li><Link to="/Team" className="text-white font-bold hover:underline">Team</Link></li>
            <li><a href="/" className="text-white font-bold hover:underline">About</a></li>
            <li><a href="/" className="text-white font-bold hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  