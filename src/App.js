import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import Content from './components/content/Content.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
