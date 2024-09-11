import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Assets2/Home';
import Pets from './Pages/Assets2/Pets';
import PetsCategory from './Pages/Assets2/PetsCategory';
import PetContextProvider from './PetContext/PetContextProvider'; // Import the provider
import AllCategory from './Pages/AllCategory';

function App() {
  return (
    <>
      <PetContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Dog' element={<PetsCategory category="dog" />} /> 
            <Route path='/Cat' element={<PetsCategory category="cat" />} />
            <Route path='/Fish' element={<PetsCategory category="Fish" />} />
            <Route path='/Bird' element={<PetsCategory category="Birds" />} />
            <Route path='/All' element={<AllCategory />} />

            <Route path="/pets/:productID" element={<Pets />} />
          </Routes>
        </BrowserRouter>
      </PetContextProvider>
    </>
  )
}

export default App;
