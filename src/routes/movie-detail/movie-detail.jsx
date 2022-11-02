import { Link, useParams } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import styles from './styles.module.css'
import Home from '../home/home'
import { useState, useEffect } from 'react'
import { movie_list, theatre_list } from '../../structure'
import MovieSelectOveraly from '../../components/movie-select-overlay/movie-select'
import SelectPersonOverlay from '../../components/select-no-persons/selectPersons'
import Overlay from '../../components/overlay/overlay'

import { ReactComponent as Selected } from '../../assets/selected.svg'
import { ReactComponent as Empty } from '../../assets/empty.svg'
import { ReactComponent as Occupied } from '../../assets/selected.svg'
import { ReactComponent as CloseIcon } from '../../assets/close.svg'

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
    const { banner_url, movie_name, genre, hearts, description, certification, release_date, languages } = movie
    return (
        <div className={styles.tile}>
            <div className={styles.moviebanner}>
                <img src={banner_url} alt={movie_name} className={styles.banner} />
                <div className={styles.moviedetails}>
                    <p className={styles.movie_name}>{movie_name}</p>
                    <p>Genre: {genre.map(genreIndividual => genreIndividual + ", ")}</p>
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
    const [openSelectPersonOverlay, setOpenSelectPersonOverlay] = useState(false)
    const availabilityList = movie["availability"][language][0][viewingType]
    const [theatreList, setTheatreList] = useState(availabilityList[0].theatres)
    const dateClickHandler = (index) => {
        setTheatreList(availabilityList[index].theatres)
    }
    const selectedTheatre = (theatre_slot) => {
        setSelectedData({ theatre_slot })
        toggleOverlay()
    }
    const toggleOverlay = () => {
        setOpenSelectPersonOverlay(!openSelectPersonOverlay)
    }
    return (
        <div>
            <div className={styles.dates}>
                {availabilityList.map((avail, index) => {

                    return (
                        <p onClick={() => dateClickHandler(index)} className={styles.date} key={index}> {avail.date}</p>
                    )
                })}
            </div>
            {theatreList.map((theatre, index) => {
                return (
                    <div className={styles.card} key={index}>
                        <div className={styles.details}>
                            <p>{theatre_list.find(theatre1 => theatre1["id"] == theatre["id"]).theatre_name}</p>
                            <div className={styles.timings}>
                                {theatre.timings.map((time, index) => {
                                    return (
                                        <div className={styles.time} onClick={() => selectedTheatre(theatre.slots[index])} key={index}>
                                            {time}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
            {openSelectPersonOverlay ? <SelectPersonOverlay onClick={toggleOverlay} setSelectedData={setSelectedData} setSelectSeatsFlag={setSelectSeatsFlag} /> : <></>}
            {selectSeatsFlag ? <SelectSeats data={selectedData} theatreList={theatreList} setSelectSeatsFlag={setSelectSeatsFlag} /> : <></>}
        </div>
    )
}

const SelectSeats = (props) => {
    const { movieIndex, language, viewingType } = useParams()
    const { theatre_slot, number, theatreList } = props.data
    const [data, setData] = useState([])
    const seatClickHandler = (event)=>{
        
    }
    useEffect(() => {
        const updateData = []
        for (const property in theatre_slot) {
            const row = theatre_slot[property]
            console.log(row.seats);
            const ele = (<div className={styles.row}>
                <div>{property}</div>
                <div className={styles.seats}>
                    {row.seats.map(ele => ele ? <Empty className={styles.chair} onClick={seatClickHandler}/> : <Occupied className={styles.chair} />)}
                </div>
            </div>)
            updateData.push(ele)
        }
        setData(updateData)
        console.log(data);
    }, [])
    const closeClickHandler = () => {
        props.setSelectSeatsFlag(false)
    }
    return (
        <Overlay>
            <div className={styles.seatCard}>
                <p>No of people: {number}</p>
                <p> Select Seats</p>
                <CloseIcon className={styles.closeicon} onClick={closeClickHandler} />
                {data.map(dat => dat)}
            </div>
        </Overlay>
    )
}



export default MovieDetail