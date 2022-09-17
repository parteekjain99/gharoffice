import Overlay from '../overlay/overlay'
import styles from './styles.module.css'
import {ReactComponent as CloseIcon } from '../../assets/close.svg'
const MovieSelectOverlay = (props) => {
    const movie = props.movie
    const viewingTypeHandler = (language,type) =>{
        console.log({language,type})
    }
    return (
        <Overlay>
            <div className={styles.selectmovie}>
                <CloseIcon onClick={props.setOpenOverlay} className={styles.closeIcon}/>
                <p className={styles.movie_name}>{movie.movie_name}</p>
                <p className={styles.desc}>Select language and format</p>
                {movie.languages.map(language => {
                    return (
                        <div className={styles.language}>
                            <p className={styles.specific_lang}>{language}</p>
                            <div className={styles.format_list}>
                                {movie.availability[language][0]["viewing_type"].map(type => {
                                    return (<div className={styles.format} onClick={()=>viewingTypeHandler(language,type)}>
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