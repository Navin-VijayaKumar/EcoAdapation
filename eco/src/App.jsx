import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Pets from './Pages/Assets2/Pets';
import PetsCategory from './Pages/Assets2/PetsCategory';
import PetContextProvider from './PetContext/PetContextProvider'; // Import the provider
import AllCategory from './Pages/AllCategory';
import Login from './Login/Login';
import Save_me from './Pages/Save_me/Save_me'
function App() {
  return (
    <>
      <PetContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/Dog' element={<PetsCategory category="dog" />} /> 
            <Route path='/Cat' element={<PetsCategory category="cat" />} />
            <Route path='/Fish' element={<PetsCategory category="fish" />} />
            <Route path='/Bird' element={<PetsCategory category="bird" />} />
            <Route path='/All' element={<AllCategory />} />
            <Route path='/Save_me' element={<Save_me />} />
            <Route path="/pets/:productID" element={<Pets />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </PetContextProvider>
    </>
  )
}

export default App;
