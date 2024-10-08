import React from 'react';
import Header from '../../components/header/Header.js';
import Footer from '../../components/footer/Footer.js';
import Content from '../../app/components/Content.js';

function Welcome() {
  return (<div>
            <Header />
            <Content />
            <Footer />
        </div>
  );
}

export default Welcome;
