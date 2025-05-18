import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="Header">
      <Link to="/" className="logo">BillettLyst</Link>
      <ul>
      
        <li><Link to="/category/musikk">Musikk</Link></li>
        <li><Link to="/category/sport">Sport</Link></li>
        <li><Link to="/category/teater">Teater/Show</Link></li>
        
      </ul>
      <ul>
      <li><Link to="/dashboard">Logg inn</Link></li>
      </ul>
    </nav>
  );
}

