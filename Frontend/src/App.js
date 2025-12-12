import { useState } from 'react';
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx';
import Search from './components/Search.jsx';
import { Route, Routes } from 'react-router-dom';
import cors from 'cors';
import './App.css'

cors();
function App(){

  
  const [searchText, setSearchText] = useState('');
    return (
    <div style={{backgroundColor:'black'}}>
    <Navbar searchText={searchText} setSearchText={setSearchText}/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search keyword={searchText} searchResults={setSearchText}/>} />
    </Routes>
    </div>
  );
}

export default App;
