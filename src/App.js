import './App.css';

import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import About from "./components/pages/About/About.js";
import Contact from './components/pages/Contact/Contact.js';
import Welcome  from './components/pages/Welcome.js';
import Blog from './components/pages/Blog/Blog.js';
import Profile from './components/pages/Profile/Profile.js'

import {AmanitaMuscariaPage, MaitakePage, TurkeyTailPage, AmanitaPanterinaPage, CordyCepsPage, YamabushitakePage, ShitakePage, ReishiPage, LionsManePage} from "./components/pages/BlogPages/BlogPages.js";


function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element=<Welcome /> />
            <Route path="/about" element=<About /> />
            <Route path="/contact" element=<Contact /> />
            <Route path="/profile" element=<Profile /> />
            <Route path="/blog" element=<Blog /> />
            <Route path="/amanita-muscaria" element=<AmanitaMuscariaPage /> />
            <Route path="/maitake" element=<MaitakePage /> />
            <Route path="/turkey-tail" element=<TurkeyTailPage /> />
            <Route path="/amanita-pantherina" element=<AmanitaPanterinaPage /> />
            <Route path="/cordyceps" element=<CordyCepsPage /> />
            <Route path="/yamabushitake" element=<YamabushitakePage /> />
            <Route path="/shitake" element=<ShitakePage /> />
            <Route path="/reishi" element=<ReishiPage /> />
            <Route path="/lions-mane" element=<LionsManePage /> />
          </Routes>
        </div>
     
    </Router>
  );
}

export default App;
