import { Link, useParams } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import styles from './styles.module.css'
import Home from '../home/home'
import { movie_list, theatre_list } from '../../structure'

const MovieDetail = (props) => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path=":movieIndex" element={<MovieDeatiled />} />
            <Route path=":movieIndex/booking" element={<Booking/>} />
        </Routes>
    )
}


const MovieDeatiled = (props) => {
    const { movieIndex } = useParams()
    const movie = movie_list[movieIndex]
    console.log(movie)
    const { banner_url, movie_name, genre, hearts, description } = movie
    return (
        <div className={styles.tile}>
            <img src={banner_url} alt={movie_name} className={styles.banner} />
            <p className={styles.movie_name}>{movie_name}</p>
            <p>{genre.map(genreIndividual => genreIndividual)}</p>
            <p>{description}</p>
            <p>{hearts}%</p>
            <Link to='./booking'>Book Tickets</Link>
        </div>
    )
}

const Booking = (props) =>{
    const { movieIndex } = useParams()
    const movie = movie_list[movieIndex]
    return (
        <div>
           
        </div>
    )
}



export default MovieDetail