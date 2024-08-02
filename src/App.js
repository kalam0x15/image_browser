import { useState, useEffect } from 'react';
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx';
import Search from './components/Search.jsx';
import { Route, Routes } from 'react-router-dom';
import './App.css'


function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const accesKey = "72r_epAr5KoDWcmLXu7bQZbGDbXAO0C58u_rilzbcqE"
  useEffect(()=>{
    if(searchText){
    fetch(`https://api.unsplash.com/photos?page=1&query=${searchText}client_id=${accesKey}`)
      .then(response=>response.json())
      .then(data=>{
        setSearchResults(data.results)
      })}

  },[searchText])

  return (
    <div style={{backgroundColor:'black'}}>
    <Navbar searchText={searchText} setSearchText={setSearchText}/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search keyword={searchText} searchResults={searchResults}/>} />
    </Routes>
    </div>
  );
}

export default App;
