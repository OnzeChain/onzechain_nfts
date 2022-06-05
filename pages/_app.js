/* pages/_app.js */
import "../styles/globals.css";
import Header from '../components/Header'
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import '../styles/index.css'

function Marketplace({ Component, pageProps }) {

  return (
  
    <div className='w-screen min-h-screen overflow-hidden capitalize bg_image'>
    <Header />
    <SideNav />
    <div className='w-screen mx-auto min-h-90vh max-w-7xl '>
      <Component {...pageProps} />
    </div>
    <Footer />
  </div>
  );
}

export default Marketplace;
