import styles from './styles.module.css'


const MovieTile = (props) =>{
    const {banner_url,movie_name,genre,hearts} = props.movie
    return (
        <div className={styles.tile}>
            <img src={banner_url} alt={movie_name} className={styles.banner}/>
            <p className={styles.movie_name}>{movie_name}</p>
        </div>
    )
}

export default MovieTile