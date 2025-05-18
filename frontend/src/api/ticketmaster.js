// src/api/ticketmaster.js

// Din Ticketmaster API-nøkkel
const API_KEY = 'OJWIEjGGbVgjMgWLS99KuhEdrPtRGiLh';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

// Standardfestivaler
const FESTIVAL_IDS = [
  'Z698xZb_Z16v7eGkFy', // Findings
  'Z698xZb_Z17q339',   // Neon
  'Z698xZb_Z17qfaA',   // Skeikampenfestivalen
  'Z698xZb_Z17q3qg'    // Tons of Rock
];

// const FESTIVAL_NAMES = [
//   'Findings',
//   'Neon',
//   'Skeikampenfestivalen',
//   'Tons of Rock'
// ];

/* Henter festivaler ved angitte Ticketmaster event IDs */
export async function fetchFestivalsById(
  ids = FESTIVAL_IDS
) {
  const urls = ids.map(
    (id) => `${BASE_URL}/events/${id}.json?apikey=${API_KEY}`
  );

  const responses = await Promise.all(
    urls.map((url) => fetch(url))
  );

  const events = await Promise.all(
    responses.map((res, idx) => {
      return res.json();
    })
  );

  return events;
}

/**
 * Henter spesifiserte festivaler etter navn
 * @param {string[]} names Array med festivalnavn
 * @returns {Promise<Array>} Array av event-objekter
 */
export async function fetchFestivalsByName(
  names = FESTIVAL_NAMES
) {
  const queries = names.map((name) => {
    const params = new URLSearchParams({
      apikey: API_KEY,
      keyword: name,
      countryCode: 'NO',
      size: '1',
    });
    return `${BASE_URL}/events.json?${params.toString()}`;
  });

  const responses = await Promise.all(
    queries.map((url) => fetch(url))
  );
  const datas = await Promise.all(
    responses.map((res) => {
      if (!res.ok) {
        throw new Error(`HTTP-feil: ${res.status}`);
      }
      return res.json();
    })
  );

  const events = datas
    .map((data, idx) => {
      const targetName = names[idx].toLowerCase();
      const matches = data._embedded?.events || [];
      return (
        matches.find((e) => e.name.toLowerCase() === targetName) ||
        matches[0]
      );
    })
    .filter(Boolean);

  return events;
}

/* Hent alle arrangementer i en by */
export async function fetchEventsByCity(city) {
  const url = `${BASE_URL}/events.json?apikey=${API_KEY}` + `&city=${encodeURIComponent(city)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data._embedded?.events || [];
}

/* Hent detaljert info om ett arrangement */
export async function fetchEventById(id) {
  const url = `${BASE_URL}/events/${id}.json?apikey=${API_KEY}`;
  const res = await fetch(url);
  return await res.json();
}


/* Hent attraksjoner, arrangementer og venues for en kategori */
export async function fetchCategoryContent(filters) {
  // Bygg query-streng
  let query = new URLSearchParams({ apikey: API_KEY });
  if (filters.keyword)            query.append('keyword', filters.keyword);
  if (filters.city)               query.append('city', filters.city);
  if (filters.countryCode)        query.append('countryCode', filters.countryCode);
  if (filters.date)               query.append('startDateTime', `${filters.date}T00:00:00Z`);
  if (filters.classificationName) query.append('classificationName', filters.classificationName);

  // Funksjon for hente embedded data
  async function fetchEmbedded(endpoint) {
    const url = `${BASE_URL}/${endpoint}.json?${query.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    return data._embedded ? Object.values(data._embedded)[0] : [];
  }

  const [attractions, events, venues] = await Promise.all([
    fetchEmbedded('attractions'),
    fetchEmbedded('events'),
    fetchEmbedded('venues'),
  ]);

  return { attractions, events, venues };
}
