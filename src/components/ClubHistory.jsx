import AnimatedContent from './AnimatedContent';
import { history } from '../data/history';

export default function ClubHistory() {
  return (
    <section className="club-history" id="geschichte" aria-labelledby="history-heading">
      <div className="history-heading">
        <h2 id="history-heading">Unsere Geschichte.</h2>
        <p>Vom ersten Kleinfeldturnier in Leisach bis zum ersten Sieg in Schlaiten.</p>
      </div>
      <ol className="history-list">
        {history.map((entry) => (
          <li key={entry.year} className={`history-entry history-entry-${entry.year}${entry.image ? '' : ' history-entry-text'}`}>
            <AnimatedContent distance={40} duration={0.8}>
              <article className="history-row">
                <div className="history-caption">
                  <p className="history-year">{entry.year}</p>
                  <h3>{entry.title}</h3>
                  {entry.text && <p>{entry.text}</p>}
                </div>
                {entry.image && (
                  <img
                    className="history-image"
                    src={entry.image}
                    alt={`Die Mannschaft des Athletic Klub Lienz ${entry.year}`}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: entry.position, aspectRatio: entry.ratio }}
                  />
                )}
              </article>
            </AnimatedContent>
          </li>
        ))}
      </ol>
    </section>
  );
}
