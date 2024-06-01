import { Link } from "react-router-dom";
import Hero from "./hero";



const Search=({keyword, searchResults})=>{
    const title = `You are searching for ${keyword}...`

    const MovieCard = ({movie})=>{
        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        const detailUrl = `/movies/${movie.id}`
        if(movie.poster_path!=null){
            
            return(
                <div className="col-lg-3 col-md-6 col-sm-6 my-4">

                    <div className="card" style={{width: "18em", color:'black'}}>
                    <img src={posterUrl} className="card-img-top" alt={movie.original_title}/>
                    <div className="card-body">
                    <h5 className="card-title">{movie.original_title}</h5>
                    <Link to={detailUrl} className="btn btn-primary">More Details</Link>
                    </div>
                    </div>
                </div>
                  
                  )
                }
        else{
            return <></>
        }

        

    };  




    const resultHtml = searchResults.map((obj , i)=>{
        return  <MovieCard movie={obj} key={i}/>
    })
    return(
        <>
            <Hero text={title}/>
            <div className="container">
                <div className="row ">

                    {resultHtml}

                </div>
            </div>
        </>
    )
}

export default Search;