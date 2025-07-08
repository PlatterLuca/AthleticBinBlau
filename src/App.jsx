import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './components/Header';
import Team from './pages/Team';
import Home from './pages/Home';
import Footer from './components/Footer';

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
