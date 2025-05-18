// src/pages/event/EventPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../styles.css';
import { fetchEventById } from '../api/ticketmaster.js';

// Henter alle varianter (festivalpass) basert på baseName
async function fetchVariantsByKeyword(baseName) {
  const apiKey = 'OJWIEjGGbVgjMgWLS99KuhEdrPtRGiLh';
  const keyword = encodeURIComponent(baseName);
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}` +
              `&keyword=${keyword}` +
              `&classificationName=Festival` +
              `&locale=*` +
              `&size=10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP-feil: ${res.status}`);
  const data = await res.json();
  return data._embedded?.events || [];
}

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchEventById(id)
      .then((evt) => {
        setEvent(evt);
        const baseName = evt.name.split(' - ')[0];
        return fetchVariantsByKeyword(baseName);
      })
      .then((vars) => setVariants(vars))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Laster festival...</p>;
  if (!event) return <p className="p-6 text-red-600">Fant ikke festival.</p>;

  const attractions = event._embedded?.attractions || [];
  const classifications = event.classifications
    ?.map((c) => c.segment?.name || c.genre?.name)
    .filter(Boolean);

  return (
    <section className="min-h-screen bg-gray-50">
      

      <main className="max-w-6xl mx-auto p-6 space-y-10">
        {/* Festivalnavn */}
        <h1 className="text-4xl font-bold">{event.name.split(' - ')[0]}</h1>

        {/* Sjanger */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Sjanger:</h2>
          <div className="flex flex-wrap gap-3">
            {classifications.length > 0 ? (
              classifications.map((cls, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {cls}
                </span>
              ))
            ) : (
              <span>Ingen sjangerinfo</span>
            )}
          </div>
        </section>

        {/* Sosiale medier */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Følg oss på sosiale medier:</h2>
          <article className="flex space-x-6 text-2xl">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook" /></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
          </article>
        </section>

        {/* Festivalpass */}
        <section className="festival-pass">
          <h2>Festivalpass:</h2>
          {variants.length === 0 ? (
            <p>Ingen festivalpass tilgjengelig.</p>
          ) : (
            <div className="festival-pass-grid">
              {variants.map((v) => (
                <article key={v.id} className="festival-pass-card">
                  <img src={v.images?.[0]?.url} alt={v.name} />
                  <div className="festival-pass-card-content">
                    <h3>{v.name}</h3>
                    <p>{v._embedded?.venues?.[0]?.name}</p>
                    <p>{v.dates?.start?.localDate}</p>
                  </div>
                  <div className="festival-pass-actions">
                    <button>Kjøp</button>
                    <button>Legg til i ønskeliste</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Artister */}
        <section className="artists">
          <h2>Artister</h2>
          {attractions.length === 0 ? (
            <p>Ingen artister funnet.</p>
          ) : (
            <article className="artists-grid">
              {attractions.map((artist) => (
                <article key={artist.id} className="artist-card">
                  {artist.images?.[0]?.url && (
                    <img
                      src={artist.images[0].url}
                      alt={artist.name}
                    />
                  )}
                  <p>{artist.name}</p>
                </article>
              ))}
            </article>
          )}
        </section>
      </main>
    </section>
  );
}
