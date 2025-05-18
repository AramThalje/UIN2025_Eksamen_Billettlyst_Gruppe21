// src/components/EventsCities.jsx

import React, { useEffect, useState } from 'react';
import { fetchEventsByCity } from '../api/ticketmaster.js';
import '../styles.css';

export default function EventsCities() {
  const [city, setCity] = useState('Oslo');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const cities = ['Oslo','Stockholm', 'Berlin', 'London', 'Paris'];

  useEffect(() => {
  const loadEvents = async () => {
    setLoading(true);
      const data = await fetchEventsByCity(city);
      setEvents(Array.isArray(data) ? data : []);
      };
    loadEvents(); 
    }, [city]);

  return (
    <section className="container">
      <h2>Hva skjer i {city}?</h2>

      <section className="city-buttons">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setCity(city)}>
            {city}
          </button>
        ))}
      </section>

      <div className="grid_gap">
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
                <h3>{evt.name}</h3>
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
