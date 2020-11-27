import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import routes from './config/routes';

function App() {
  return (
    <body className="app-container">
      <Navbar/>
      <main>
      {routes}
      </main>
      
      <Footer/>
    </body>
  );
}

export default App;
