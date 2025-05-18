import { useEffect, useState } from 'react';
import { fetchEventsByCity } from '../api/ticketmaster';
import EventCard from './EventCard';

function CityEvents() {
  const [city, setCity] = useState('Oslo');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEventsByCity(city).then(setEvents);
  }, [city]);

  const cities = ['Oslo', 'Stockholm', 'Berlin', 'London', 'Paris'];

  return (
    <div className="city-events">
      <h2>Hva skjer i {city}</h2>
      <div className="city-buttons">
        {cities.map(c => (
          <button key={c} onClick={() => setCity(c)}>{c}</button>
        ))}
      </div>
      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} clickable={false} />
        ))}
      </div>
    </div>
  );
}

export default CityEvents;