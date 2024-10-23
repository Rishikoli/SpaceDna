import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Space from './components/Space'; // New WelcomePage component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home page */}
          <Route path="/space" element={<Space />} />  {/* Welcome page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
