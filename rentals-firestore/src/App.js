import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Reviews from './Reviews';
import AddReview from './AddReview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/school/:schoolName" element={<Reviews />} />
        <Route path="/school/:schoolName/:category" element={<AddReview />} />
      </Routes>
    </Router>
  );
}

export default App;
