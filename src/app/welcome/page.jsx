import React from 'react';
import Header from '../components/header/Header.js';
import Footer from '../components/footer/Footer.js';
import Content from '../components/Content.js';

function Welcome() {
  console.log('231')
  return (<div>
            <Header />
            <Content />
            <Footer />
        </div>
  );
}

export default Welcome;
