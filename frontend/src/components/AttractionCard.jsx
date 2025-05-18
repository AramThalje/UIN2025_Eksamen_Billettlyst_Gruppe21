// src/components/AttractionCard.jsx
export default function AttractionCard({ item, isSaved, onSave }) {
  // Pakk ut bildet (bruk første i arrayet om det finnes)
  const imageUrl = item.images?.[0]?.url || '/placeholder.png';

  return (
    <section className="attraction-card">
      <img
        src={imageUrl}
        alt={item.name}
        className="image"
      />
      <h3 className="title">{item.name}</h3>
      {item.info && <p className="description">{item.info}</p>}
      <button onClick={() => onSave(item.id)}>
        {isSaved ? '💖' : '🤍'}
      </button>
    </section>
  );
}
