import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function closeOutside(event) {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    }
    if (!open) return;
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [open]);

  // A route change or switching to desktop also closes the disclosure.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    function closeOnDesktop() { if (desktop.matches) setOpen(false); }
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <header ref={headerRef} className="mobile-menu-header fixed w-full backdrop-blur bg-blue-800/30 px-4 py-3 z-50 md:hidden">
      <div className="flex justify-between items-center">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center no-underline text-white drop-shadow-sm" aria-label="Athletic Klub Lienz – Home">
          <img src="/logo.png" alt="" className="w-8 mr-2" />
          <span className="font-bold text-base">| AKL</span>
        </Link>
        <button ref={buttonRef} type="button" className="mobile-menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 5h18M3 12h18M3 19h18" />}
          </svg>
        </button>
      </div>
      <nav id="mobile-navigation" aria-label="Hauptnavigation" hidden={!open} className="mobile-menu-links">
        {[['/', 'Home'], ['/team', 'Team'], ['/about', 'About'], ['/contact', 'Kontakt']].map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
      </nav>
    </header>
  );
}
