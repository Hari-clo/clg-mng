import './App.css';
import AppRoutes from './Routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-light d-flex flex-column min-vh-100 text-start">
        <Navbar />
        <main className="flex-grow-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;


