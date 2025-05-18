// src/pages/event/EventPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
  const data = await res.json();
  return data._embedded?.events || [];
}

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  
  

  useEffect(() => {
    fetchEventById(id)
      .then((evt) => {
        setEvent(evt);
        const baseName = evt.name.split(' - ')[0];
        return fetchVariantsByKeyword(baseName);
      })
      
  }, [id]);

  
  if (!event) return <p>Fant ikke festival.</p>;

  const attractions = event._embedded?.attractions || [];
  const classifications = event.classifications
    ?.map((classification) => classification.segment?.name || classification.genre?.name)
    .filter(Boolean);

  return (
    
      

      <main >
        {/* Festivalnavn */}
        <h1>{event.name.split()[0]}</h1>

        {/* Sjanger */}
        <section>
          <h2>Sjanger:</h2>
          <section >
            {classifications.length > 0 && classifications.map((genre, i) => (
              <span key={i}> {genre} </span>
            ))}
            
          </section>
        </section>

        {/* Festivalpass */}
        <section className="festival-pass">
          <h2>Festivalpass:</h2>
          {variants.length === 0 ? (
            <p>Ingen festivalpass tilgjengelig.</p>
          ) : (
            <section className="festival-pass-grid">
              {variants.map((v) => (
                <article key={v.id} className="festival-pass-card">
                  <img src={v.images?.[0]?.url} alt={v.name} />
                  <section className="festival-pass-card-content">
                    <h3>{v.name}</h3>
                    <p>{v._embedded?.venues?.[0]?.name}</p>
                    <p>{v.dates?.start?.localDate}</p>
                  </section>
                  <section className="festival-pass-actions">
                    <button>Kjøp</button>
                    <button>Legg til i ønskeliste</button>
                  </section>
                </article>
              ))}
            </section>
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
    
  );
}
