import React, {useState, useEffect} from 'react';
import axios from './axios'; //instance was given axios as an alias name because it was exported as default so the name could be changed here
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/"; // base url for images

const Row = ({title,fetchUrl,isLargeRow}) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(()=>{
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(movies);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.title || movie?.original_title || "")
            .then((res) => {
                setTrailerUrl(`http://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=e64067f447b7a1fc24b9b2dff8d1b1b4`);
            })
            .catch((error) => console.log(error));
        }
    };

  return (

    <div className='row'>

        <h2>{title}</h2>
        <div className="row_posters">
           
            {movies.map((movie)=>{
                return(
                    <img 
                        key={movie.id}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        onClick={()=> handleClick(movie)}
                    />
            ) 
            })};
        </div>

        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
        

    </div>

  )

}

export default Row;