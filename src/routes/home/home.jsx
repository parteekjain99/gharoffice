import { movie_list, theatre_list } from '../../structure'
import { Link } from "react-router-dom";
import styles from './styles.module.css'
import MovieTile from '../../components/movie-tile/movie-tile'
import MovieSelectOverlay from '../../components/movie-select-overlay/movie-select'
const Home = () => {
    
    return (
        <div className={styles.home}>
            <p className={styles.subtitle}>Released Movies</p>
            <div className={styles.movie_list}>
                {movie_list.map((movie, index) => {
                    return (
                        <div key={index}>
                           <Link to={`movie/${index}`}><MovieTile movie={movie}/></Link>
                        </div>
                    )
                })}
            </div>
            
        </div>
    );
}

export default Home;


/* <MovieSelectOverlay movie = {movie_list[1]}/> */