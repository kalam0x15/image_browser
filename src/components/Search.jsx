import { useState , useEffect } from "react";
import Hero from "./hero";



const Search=({keyword, searchResults})=>{
    const [result , setResult] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const accesKey = "Z6JmMhtXOkGXbYmxFkmjFgsKJJAXnGlaI98dSqFKD9wU0LNGdXjbb3BO"
  useEffect(()=>{
    fetch(`https://api.pexels.com/v1/search?query=${keyword}&per_page=80`,{
            headers: {
                Authorization: accesKey
            }
        })
        .then(response=>response.json())
        .then(data=>{
            setIsLoading(true)
            setResult(data.photos)
        },[])

  })

  function show(){

    if(isLoading){
        <Hero text="Loading..."/>
      }
      return(
      <>
      <div className="d-flex justify-content-evenly flex-wrap">
          {result.map((val) => {
            return(
              <img
              key={val.id}
              className="col-4 img-fluid img-thumbnail"
              src={val.src.large}
              alt={val.alt}
              style={{width:`${val.width/10}px`,height:`${val.height/10}px`}}
              />
              
            )
          })}
        </div>
        </>


      )
}


return show();
    

}

export default Search;