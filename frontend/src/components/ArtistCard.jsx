export default function ArtistCard({ artist }) {
  const image = artist.images?.[0]?.url;

  return (
    <section className="artist-card">
      {image && <img src={image} alt={artist.name} />}
      <h4>{artist.name}</h4>
      {artist.classifications?.[0]?.genre?.name && (
        <p>{artist.classifications[0].genre.name}</p>
      )}
    </section>
  );
}

