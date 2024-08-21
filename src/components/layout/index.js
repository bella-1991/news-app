import React, { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Anchor from './anchor'
import styles from './layout.module.scss'

export default function Layout() {
  const [scroll, setSroll] = useState(false)
  const [scrollMore, setSrollMore] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })    

    return () => {
        window.removeEventListener('scroll', handleScroll)
    };
  }, []);

  const handleScroll = () => {
      const position = window.pageYOffset
      
      if (position > 50) {
        setSroll(true)
        if (position > 140) {
          setSrollMore(true)
        } else {
          setSrollMore(false)
        }
      } else {
        setSroll(false)
      }  
  };
  
  return (        
      <div className={scroll ? 'app scrolled' : 'app' }>
          <Header src='../images/logo.png' />  
          <Anchor />
          <main className={`${scrollMore ? 'main scroll-more' : 'main'} ${styles.container}`}>
              <Suspense>
                  <Outlet />
              </Suspense>
          </main>
          <Footer />
      </div>
  )
}