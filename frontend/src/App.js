import './App.css';
import Navbar from './components/Navbar';
import routes from './config/routes';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {routes}
    </div>
  );
}

export default App;
