import { Link, useParams } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import styles from './styles.module.css'
import Home from '../home/home'
import {useState} from 'react'
import { movie_list, theatre_list } from '../../structure'
import MovieSelectOveraly from '../../components/movie-select-overlay/movie-select'

const MovieDetail = (props) => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path=":movieIndex" element={<MovieDeatiled />} />
            <Route path=":movieIndex/booking/:language/:viewingType" element={<ViewTheatres/>} />
        </Routes>
    )
}


const MovieDeatiled = (props) => {
    const [openOverlay, setOpenOverlay] = useState(false)
    const bookingHandler=() =>{
        setOpenOverlay(!openOverlay)
    }
    const { movieIndex } = useParams()
    const movie = movie_list[movieIndex]
    const { banner_url, movie_name, genre, hearts, description } = movie
    return (
        <div className={styles.tile}>
            <img src={banner_url} alt={movie_name} className={styles.banner} />
            <p className={styles.movie_name}>{movie_name}</p>
            <p>{genre.map(genreIndividual => genreIndividual)}</p>
            <p>{description}</p>
            <p>{hearts}%</p>
            <button onClick={bookingHandler}>Book Tickets</button>
            {openOverlay?<MovieSelectOveraly movie={movie} setOpenOverlay={bookingHandler}/>:<></>}
        </div>
    )
}

const ViewTheatres = ()=>{
    const {movieIndex,language,viewingType} = useParams()
    const movie = movie_list[movieIndex]
    const availabilityList = movie["availability"][language][0][viewingType]
    const [theatreList, setTheatreList] = useState(availabilityList[0].theatres)
    return (
        <div>
            {/* date selection */}
            {theatreList.map(theatre=>{
                return (
                    <div className="card">
                        <p>{theatre_list.find(theatre1=>theatre1["id"]==theatre["id"]).theatre_name}</p>
                        <div className={styles.timings}>
                        {theatre.timings.map((time,index)=>time)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieDetail