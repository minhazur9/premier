import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import routes from './config/routes';

function App() {
  return (
    <div className="app-container">
      <Navbar/>
      <main>
      {routes}
      </main>
      
      <Footer/>
    </div>
  );
}

export default App;
