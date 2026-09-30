import { Link } from 'react-router-dom';
import AnimatedContent from './AnimatedContent';
import { history } from '../data/history';

export default function MainContent() {
  const highlights = [history[0], history[history.length - 1]];
  return (
    <section className="home-history" aria-labelledby="home-history-heading">
      <div className="history-heading">
        <h2 id="home-history-heading">Unser Weg.</h2>
        <p>Von den Anfängen in Leisach bis hin zu den größten Bühnen des Kleinfeldfußballs in Osttirol.</p>
      </div>
      <div className="history-preview-grid">
        {highlights.map((entry) => (
          <AnimatedContent key={entry.year} distance={40} duration={0.9}>
            <figure>
              <img className="history-image" src={entry.image} alt={`Athletic Klub Lienz ${entry.year}`} loading="lazy" decoding="async" style={{ objectPosition: entry.position, aspectRatio: entry.ratio }} />
              <figcaption><span>{entry.year}</span>{entry.title}</figcaption>
            </figure>
          </AnimatedContent>
        ))}
      </div>
      <Link className="club-text-link" to="/about#geschichte">Unsere Geschichte ansehen</Link>
    </section>
  );
}
