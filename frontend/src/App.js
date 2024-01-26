import Header from './components/header/Header';
import Footer from './containers/Footer';
import './App.css';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
