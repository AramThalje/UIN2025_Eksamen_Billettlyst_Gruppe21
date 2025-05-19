

// Din Ticketmaster API-nøkkel, Her brukte vi Aram sin apikey for å hente info fra ticketmaster api
const API_KEY = 'OJWIEjGGbVgjMgWLS99KuhEdrPtRGiLh';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

// Spesifikk festivaler som skal vises øvert på Home seksjon
const FESTIVAL_IDS = [
  'Z698xZb_Z16v7eGkFy', //  Id-en av festival: Findings
  'Z698xZb_Z17q339',   // Id-en av festival: Neon
  'Z698xZb_Z17qfaA',   // Id-en av festival: Skeikampenfestivalen
  'Z698xZb_Z17q3qg'    // Id-en av festival: Tons of Rock
];

/* Henter festivaler ved angitte Ticketmaster event IDs */
export async function fetchFestivalsById(
  Fes_ids = FESTIVAL_IDS
) {
  const urls = Fes_ids.map((id) =>
      `${BASE_URL}/events/${id}.json?apikey=${API_KEY}`
  );

  const responses = await Promise.all(
    urls.map((url) => fetch(url))
  );

  const events = await Promise.all(
    responses.map((res) => {
      return res.json();
    })
  );

  return events;
}


/* Hent alle arrangementer i en by */
export async function fetchEventsByCity(city) {
  const url = `${BASE_URL}/events.json?apikey=${API_KEY}` + `&city=${encodeURIComponent(city)}`; 
  // The encodeURIComponent() method encodes special characters including: , / ? : @ & = + $ #
  const res = await fetch(url);
  const data = await res.json();
  return data._embedded?.events;
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
  if (filters.keyword) query.append('keyword', filters.keyword);
  if (filters.city) query.append('city', filters.city);
  if (filters.countryCode) query.append('countryCode', filters.countryCode);
  if (filters.date) query.append('startDateTime', `${filters.date}T00:00:00Z`);
  if (filters.classificationName) query.append('classificationName', filters.classificationName);
  // URLSearchParams objects are iterable, so they can directly be used in a for...of structure to iterate over key/value pairs in the same order as they appear in the query string, for example the following two lines are equivalent:
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  
  // Funksjon for hente embedded data
  async function fetchEmbedded(endpoint) {
    const url = `${BASE_URL}/${endpoint}.json?${query.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    return data._embedded ? Object.values(data._embedded)[0] : [];
  }

  const [attractions, events, venues] = await Promise.all([ // The Promise.all() method takes an array of promises and returns a single Promise that resolves when all of the promises have resolved
    fetchEmbedded('attractions'),
    fetchEmbedded('events'),
    fetchEmbedded('venues'),
  ]);

  return { attractions, events, venues };
}
