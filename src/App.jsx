import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './components/Header';
import Team from './pages/Team';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function RouteScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Wrapper to handle redirect after 404 fallback
function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.redirect;
    if (redirectPath) {
      sessionStorage.removeItem('redirect');
      navigate(redirectPath);
    }
  }, [navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <RedirectHandler />
      <RouteScroll />
      <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
