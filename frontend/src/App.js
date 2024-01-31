import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import setCSRFToken from './functions/setCsrf';
import Cookies from 'js-cookie';


function App() {
  useEffect(() => {
    const cookies = Cookies.get();
    if (!cookies.csrf_token) {
      setCSRFToken();
    }
    return () => {};
  }, []);


  return (
    <div style={{ minHeight: "100vh" }} className="d-flex flex-column">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
