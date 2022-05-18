import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import React from 'react';
import Header from '../components/Header'
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
    <div className='App '>
      <Header />
      <SideNav />
      <div className='w-screen mx-auto min-h-90vh max-w-7xl '>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
    </ThemeProvider>
  )
}

export default MyApp
