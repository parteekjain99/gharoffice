import { Link, useParams } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import styles from './styles.module.css'
import Home from '../home/home'
import { useState } from 'react'
import { movie_list, theatre_list } from '../../structure'
import MovieSelectOveraly from '../../components/movie-select-overlay/movie-select'
import SelectPersonOverlay from '../../components/select-no-persons/selectPersons'
import Overlay from '../../components/overlay/overlay'
const MovieDetail = (props) => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path=":movieIndex" element={<MovieDeatiled />} />
            <Route path=":movieIndex/booking/:language/:viewingType" element={<ViewTheatres />} />
        </Routes>
    )
}


const MovieDeatiled = (props) => {
    const [openOverlay, setOpenOverlay] = useState(false)
    const bookingHandler = () => {
        setOpenOverlay(!openOverlay)
    }
    const { movieIndex } = useParams()
    const movie = movie_list[movieIndex]
    const { banner_url, movie_name, genre, hearts, description,certification,release_date,languages } = movie
    return (
        <div className={styles.tile}>
            <div className={styles.moviebanner}>
                <img src={banner_url} alt={movie_name} className={styles.banner} />
                <div className={styles.moviedetails}>
                    <p className={styles.movie_name}>{movie_name}</p>
                    <p>Genre: {genre.map(genreIndividual => genreIndividual+", ")}</p>
                    <p>Likes: {hearts}%</p>
                    <p>Certification: {certification}</p>
                    <p>Release Date: {release_date}</p>
                    <p>Description: {description}</p>
                </div>
            </div>
            <button onClick={bookingHandler} className={styles.bookBtn}>Book Tickets</button>
            {openOverlay ? <MovieSelectOveraly movie={movie} setOpenOverlay={bookingHandler} /> : <></>}
        </div>
    )
}

const ViewTheatres = () => {
    const { movieIndex, language, viewingType } = useParams()
    const movie = movie_list[movieIndex]
    const [selectedData, setSelectedData] = useState(null)
    const [selectSeatsFlag, setSelectSeatsFlag] = useState(false)
    console.log(selectedData)
    const [openSelectPersonOverlay,setOpenSelectPersonOverlay] = useState(false)
    const availabilityList = movie["availability"][language][0][viewingType]
    const [theatreList, setTheatreList] = useState(availabilityList[0].theatres)
    const selectedTheatre = (theatre_id,time_index)=>{
        setSelectedData({theatre_id,time_index})
        toggleOverlay()
    }
    const toggleOverlay=() =>{
        setOpenSelectPersonOverlay(!openSelectPersonOverlay)
    }
    return (
        <div>
            {/* date selection */}
            {theatreList.map((theatre,index) => {
                return (
                    <div className={styles.card} key={index}>
                        <div className={styles.details}>
                            <p>{theatre_list.find(theatre1 => theatre1["id"] == theatre["id"]).theatre_name}</p>
                            <div className={styles.timings}>
                                {theatre.timings.map((time, index) => {
                                    return (
                                        <div className={styles.time} onClick={()=>selectedTheatre(theatre["id"],index)} key={index}>
                                            {time}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
            {openSelectPersonOverlay?<SelectPersonOverlay onClick={toggleOverlay} setSelectedData={setSelectedData} setSelectSeatsFlag={setSelectSeatsFlag}/>:<></>}
            {selectSeatsFlag?<SelectSeats data={selectedData} theatreList={theatreList}/>:<></>}
        </div>
    )
}

const SelectSeats = (props)=>{
    const { movieIndex, language, viewingType } = useParams()
    const {theatre_id,time_index,number,theatreList} = props.data
    return (
        <Overlay>
            <div className={styles.seatCard}>
                sjdkadsklasd
                askda;klsd
            </div>
        </Overlay>
    )
}



export default MovieDetail