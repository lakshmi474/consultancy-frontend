import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { initScrollAnimations, initLazyLoading } from '../utils/scrollAnimation';

const Layout = ({ children }) => {
  useEffect(() => {
    // Initialize scroll animations and lazy loading
    initScrollAnimations();
    initLazyLoading();
  }, []);

  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;


