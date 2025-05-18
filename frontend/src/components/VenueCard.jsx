export default function VenueCard({ item, isSaved, onSave }) {
  return (
    <article className="event-card">
      <h3>{item.name}</h3>
      <p>{item.city?.name}, {item.country?.name}</p>
      <button onClick={() => onSave(item.id)}>{isSaved ? '❤️' : '🤍'}</button>
    </article>
  );
}

