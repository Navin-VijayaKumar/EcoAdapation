import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from '../Components/Navbar/Navbar';
import Admin from './Pages/Admin';

function App() {
  return (
    <Router>
      <Navbar />
      <Admin />
    </Router>
  );
}

export default App;
