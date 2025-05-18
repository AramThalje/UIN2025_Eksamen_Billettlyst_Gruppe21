
import '../styles.css';

export default function EventCard({ event }) {
  const date = event.dates?.start?.localDate || 'Ukjent dato';
  const venueName = event._embedded?.venues?.[0]?.name || 'Ukjent sted';

  return (
    <section className="festival-pass-card">
      {event.images?.[0]?.url && (
        <img src={event.images[0].url} alt={event.name} />
      )}
      <article className="festival-pass-card-content">
        <h3>{event.name}</h3>
        <p>{venueName}</p>
        <p>{date}</p>
      </article>
      <article className="festival-pass-actions">
        <button className="btn">Kjøp</button>
        <button>Legg til i ønskeliste</button>
      </article>
    </section>
  );
}
