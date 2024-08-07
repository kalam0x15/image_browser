import { useEffect, useState } from "react"
import Hero from "./hero"


const Home = () =>{
    
    const [result , setResult] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(1);
    const accesKey = "Z6JmMhtXOkGXbYmxFkmjFgsKJJAXnGlaI98dSqFKD9wU0LNGdXjbb3BO"

    const handlePrevClick = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };
    
    const handleNextClick = () => {
      if (currentIndex < 40) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  useEffect(()=>{
    
    fetch(`https://api.pexels.com/v1/curated/?page=${currentIndex}&per_page=80`,{
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
        <div id="Forback_btn">
          <button className="prev" onClick={handlePrevClick}>
          <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="page">{currentIndex}</span>
          <button className="next" onClick={handleNextClick}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="d-flex justify-content-evenly flex-wrap">
            {result.map((val) => {
              return(
                <img
                key={val.id}
                className="col-4 img-fluid img-thumbnail"
                src={val.src.large2x}
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


export default Home;