export default function SearchFilter({ setFilters }) {
  return (
    <section className="filters">
      <input placeholder="Søk..." onChange={e => setFilters(prev => ({ ...prev, keyword: e.target.value }))} />
      <input placeholder="By" onChange={e => setFilters(prev => ({ ...prev, city: e.target.value }))} />
      <input placeholder="Landkode (NO, DE, FR)" onChange={e => setFilters(prev => ({ ...prev, countryCode: e.target.value }))} />
      <input type="date" onChange={e => setFilters(prev => ({ ...prev, date: e.target.value }))} />
    </section>
  );
}

