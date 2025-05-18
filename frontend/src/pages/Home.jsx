import { useEffect, useState } from 'react';
import { fetchFestivalsById } from '../api/ticketmaster';
import EventCard from '../components/EventCard';
import CityEvents from '../components/CityEvents';
import FestivalsSection from '../components/FestivalsSection';
import EventsCities from '../components/EventsCities';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchFestivalsById()
    .then(setEvents);
  }, []);

  

  return (
    <section className="home">
      <h1>Sommerens festivaler!</h1>
      <article className="event-grid">
        {events.map(event => (
          <FestivalsSection key={event.id} event={event} />
        ))}
            
      </article>
          <EventsCities />
    </section>
  );
}

 