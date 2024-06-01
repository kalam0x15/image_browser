import { useEffect, useState } from "react"
import Hero from "./hero"


const Home = () =>{
    
    const [result , setResult] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const accesKey = "72r_epAr5KoDWcmLXu7bQZbGDbXAO0C58u_rilzbcqE"
  useEffect(()=>{
    
    fetch(`https://api.unsplash.com/photos?&client_id=${accesKey}`)
      .then(response=>response.json())
      .then(data=>{
        setResult(data)
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
                    className="col-3 img-fluid img-thumbnail"
                    src={val.urls.small}
                    alt="val.alt_description"
                    style={{width:'18em',height:'18em'}}
                    />
          
        )
    })}
</div>
 
 
)
}
return show();
}


export default Home;