import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from "./components/pages/About/About.js";
import Contact from './components/pages/Contact/Contact.js';
import Welcome  from './components/pages/Welcome.js';
import Assignment3 from './components/pages/assignment-3/Assignment3.js';


function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element=<Welcome /> />
            <Route path="/about" element=<About /> />
            <Route path="/contact" element=<Contact /> />
            <Route path="/assignment3" element=<Assignment3 /> />
          </Routes>
        </div>
     
    </Router>
  );
}

export default App;
