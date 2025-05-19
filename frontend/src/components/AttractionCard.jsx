import { useState } from 'react';

export default function AttractionCard({ item}) {
  const [isSaved, setIsSaved] = useState();
  const imageUrl = item.images?.[0]?.url;

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <article className="attraction-card">
      <img src={imageUrl} alt={item.name} className="image" />
      <h3 className="title">{item.name}</h3>
      {item.info && <p className="description">{item.info}</p>}
      <button onClick={handleSaveClick}> {isSaved ? '❤️' : '🤍'} </button>
      {/* Emogi blir hentet fra:  https://emojipedia.org/symbols */}
    </article>
  );
}