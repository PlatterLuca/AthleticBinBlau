import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Team from './pages/Team';
import Home from './pages/Home';
import Footer from './components/Footer';
// Add other pages like News, History, Contact

function App() {
  return (
    <Router>
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
