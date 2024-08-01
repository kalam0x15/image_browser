import { useEffect, useState } from "react"
import Hero from "./hero"


const Home = () =>{
    
    const [result , setResult] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const accesKey = "Z6JmMhtXOkGXbYmxFkmjFgsKJJAXnGlaI98dSqFKD9wU0LNGdXjbb3BO"
  useEffect(()=>{
    
    fetch(`https://api.pexels.com/v1/curated/?page=4&per_page=80`,{
      headers: {
        Authorization: accesKey
      }
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data.photos)
        setResult(data.photos)
        setIsLoading(false)
      },[])

  })
  

  function show(){

      if(isLoading){
          <Hero text="Loading..."/>
        }
        return(
            
        <div className="col-12 d-flex justify-content-evenly flex-wrap">
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
 
 
)
}
return show();
}


export default Home;