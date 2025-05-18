// src/components/EventsCities.jsx

import React, { useEffect, useState } from 'react';
import { fetchEventsByCity } from '../api/ticketmaster.js';
import '../styles.css';

export default function EventsCities() {
  const [city, setCity] = useState('Oslo');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = ['Oslo','Stockholm', 'Berlin', 'London', 'Paris'];

  useEffect(() => {
    setLoading(true);
    fetchEventsByCity(city)
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
          setError(null);
        } else {
          setError('Ugyldig data fra server');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <section className="container">
      <h2 className="text-2xl font-semibold mb-4">Hva skjer i {city}?</h2>

      <div className="city-buttons mb-6">
        {cities.map(c => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className={`px-4 py-2 rounded ${
              c === city ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid_gap-6">
        {events.map(evt => {
          const imageUrl = evt.images?.[0]?.url;
          const date     = evt.dates?.start?.localDate;
          const time     = evt.dates?.start?.localTime;
          const venue    = evt._embedded?.venues?.[0] || {};
          const country  = venue.country?.countryCode;
          const cityName = venue.city?.name;
          const venueName= venue.name;

          return (
            <section className='CitiesSection'>
                <article key={evt.id} className="event-detail">
                {imageUrl && <img src={imageUrl} alt={evt.name} />}
                <h3 className="mt-4 font-bold">{evt.name}</h3>
                {date  && <p>{date}{time && ` • ${time}`}</p>}
                {country && <p>{country}</p>}
                {cityName&& <p>{cityName}</p>}
                {venueName&& <p>{venueName}</p>}
                </article>
            </section>
          );
        })}
      </div>
    </section>
  );
}
