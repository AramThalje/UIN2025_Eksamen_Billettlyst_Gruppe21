// src/components/AttractionCard.jsx
export default function AttractionCard({ item, isSaved, onSave }) {
  // Pakk ut bildet (bruk første i arrayet om det finnes)
  const imageUrl = item.images?.[0]?.url || '/placeholder.png';

  return (
    <div className="attraction-card">
      {/* Bildet */}
      <img
        src={imageUrl}
        alt={item.name}
        className="image"
      />

      {/* Navn */}
      <h3 className="title">{item.name}</h3>

      {/* Valgfri beskrivelse */}
      {item.info && <p className="description">{item.info}</p>}

      {/* “Hjerte”-knapp */}
      <button onClick={() => onSave(item.id)}>
        {isSaved ? '💖' : '🤍'}
      </button>
    </div>
  );
}
