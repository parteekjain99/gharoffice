import Overlay from '../overlay/overlay'
import styles from './styles.module.css'

const MovieSelectOverlay = (props) => {
    const movie = props.movie
    return (
        <Overlay>
            <div className={styles.selectmovie}>
                <p className={styles.movie_name}>{movie.movie_name}</p>
                <p className={styles.desc}>Select language and format</p>
                {movie.languages.map(language => {
                    return (
                        <div className={styles.language}>
                            <p className={styles.specific_lang}>{language}</p>
                            <div className={styles.format_list}>
                                {movie.availability[language][0]["viewing_type"].map(type => {
                                    return (<div className={styles.format}>
                                        {type}
                                    </div>)
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Overlay>
    )
}

export default MovieSelectOverlay