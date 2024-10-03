import './App.css';

import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import About from "./components/pages/About/About.js";
import Contact from './components/pages/Contact/Contact.js';
import Welcome  from './components/pages/Welcome.js';
import Blog from './components/pages/Blog/Blog.js';


function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element=<Welcome /> />
            <Route path="/about" element=<About /> />
            <Route path="/contact" element=<Contact /> />
            <Route path="/blog" element=<Blog /> />
          </Routes>
        </div>
     
    </Router>
  );
}

export default App;
