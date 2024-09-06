import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PetContextProvider from './src/PetContext/PetContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <PetContextProvider>

   <App/>
      </PetContextProvider>
);

reportWebVitals();