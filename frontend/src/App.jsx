import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventPage from './pages/EventPage';
import CategoryPage from './pages/CategoryPage';
import Dashboard from './pages/Dashboard';
import './styles.css';
import Header from './components/Header';


export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </>
  );
}

