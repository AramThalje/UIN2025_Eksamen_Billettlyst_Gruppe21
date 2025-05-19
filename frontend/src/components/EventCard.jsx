
import '../styles.css';

export default function EventCard({ event }) {
  const date = event.dates?.start?.localDate; // henter lokal dato hvis dates og start finnes.
  const venueName = event._embedded?.venues?.[0]?.name; // henter navnet på første venue i _embedded.venues om det finnes.

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
