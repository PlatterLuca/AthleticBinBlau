import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedContent from '../components/AnimatedContent';
const EMAIL = 'AthleticKlubLienz@gmx.at';
export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('');
  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); setCopyStatus('E-Mail-Adresse kopiert.'); }
    catch { setCopyStatus('Bitte die E-Mail-Adresse markieren und manuell kopieren.'); }
  }
  return <div className="club-page club-contact">
      <div className="hidden md:flex w-full px-12 py-6 justify-between items-center text-[#071A33]">
        <a href="/" className="flex items-center no-underline drop-shadow-sm">
          <img src="/logo.png" alt="Athletic Binblau Logo" className="w-10 mr-3" />
          <span className="font-bold text-lg">| AKL</span>
        </a>
        <nav><ul className="flex gap-8 font-medium text-base">
          <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/team" className="hover:underline">Team</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Kontakt</a></li>
        </ul></nav>
      </div>
<div className="club-container club-section">
    <AnimatedContent distance={60} reverse duration={1.1} delay={0.15}>
    <div className="club-section-heading"><h1>Schreib uns</h1><p>Eine Frage zum Verein oder eine Einladung zum Turnier? Hier erreicht ihr uns.</p></div>
    </AnimatedContent>
    <div className="club-contact-grid">
      <div className="club-contact-options">
        <AnimatedContent distance={50} duration={1} delay={0.25}>
          <section className="club-contact-card"><p className="club-eyebrow">Direkter Kontakt</p><h2>Schreibt uns.</h2><p>Für Turniere, Vereinsfragen und alles Weitere.</p><a className="club-email" href={`mailto:${EMAIL}`}>{EMAIL}</a><div className="club-contact-actions">
            <a className="club-text-link" href={`mailto:${EMAIL}`}>E-Mail schreiben</a>
            <button className="club-copy" type="button" onClick={copyEmail}>Adresse kopieren</button>
          </div><p className="club-copy-status" role="status">{copyStatus}</p></section>
        </AnimatedContent>
        <AnimatedContent distance={50} duration={1} delay={0.35}>
          <section className="club-contact-feature">
            <p className="club-eyebrow">Lienz · Osttirol</p>
            <h2>Athletic Klub Lienz.</h2>
            <p>Fußball unter Freunden. Zu Hause in Osttirol.</p>
            <img
              src="/Teamfoto.jpeg"
              alt="Die Mannschaft des Athletic Klub Lienz"
              className="w-full rounded-lg mb-6"
              loading="lazy"
            />
            <Link className="club-text-link" to="/about">
              Mehr über den Verein
            </Link>
          </section>
        </AnimatedContent>
      </div>
    <section className="club-contact-feed" aria-label="Instagram Feed">
      <AnimatedContent distance={60} duration={1} delay={0.15}>
        <div className="club-feed-heading">
          <p className="club-eyebrow">Aus dem Vereinsleben</p>
          <h2>Auch auf Instagram.</h2>
          <p>Bilder vom Platz und Nachrichten direkt an uns.</p>
        </div>
        <div className="relative w-full" style={{ paddingTop: '130%' }}>
          <iframe
            src="https://lightwidget.com/widgets/b117544e658a5e9a942a01c906235be8.html"
            className="absolute inset-0 w-full h-full lightwidget-widget bg-[#FDF6F2]"
            style={{ border: 0, overflow: 'hidden' }}
            loading="lazy"
            title="Instagram Feed des Athletic Klub Lienz"
          />
        </div>
        <a className="club-text-link" href="https://www.instagram.com/athleticklublienz" target="_blank" rel="noreferrer">
          Instagram öffnen
        </a>
      </AnimatedContent>
    </section>
    </div>
  </div></div>;
}
