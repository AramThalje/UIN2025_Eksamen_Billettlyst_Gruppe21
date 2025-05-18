import { Link } from 'react-router-dom';

export default  function FestivalsSection({ event }) {
  const imageUrl = event.images?.[0]?.url;

  return (
    <article className="event-card">
      <img src={imageUrl} alt={event.name} />
      <h3>{event.name}</h3>
      <Link to={`/event/${event.id}`} className="btn">
        Les mer om {event.name}
      </Link>
    </article>
  );
}
