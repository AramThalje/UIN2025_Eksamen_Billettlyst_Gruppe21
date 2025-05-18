import { useState } from 'react';

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Logg inn</h2>
        <input type="text" placeholder="Brukernavn" onChange={e => setUsername(e.target.value)} />
        <button type="submit">Logg inn</button>
      </form>
    );
  }

  return (
    <div>
      <h1>Min side</h1>
      <p>Velkommen, {username}!</p>
      <p>Her vil dine lagrede arrangementer vises (fremtidig funksjon).</p>
    </div>
  );
}

export default Dashboard;