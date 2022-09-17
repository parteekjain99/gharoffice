import Overlay from '../overlay/overlay'
import styles from './styles.module.css'
import { ReactComponent as CloseIcon } from '../../assets/close.svg'
const SelectPersonOverlay = (props) => {
    const {setSelectedData} = props
    const clickHandler = (number) =>{
        setSelectedData(oldData=>{
            return {...oldData,number}
        })
        props.onClick()
        props.setSelectSeatsFlag(true)
    }
    const people = [1, 2, 3, 4, 5, 6]
    return (
        <Overlay>
            <div className={styles.card}>
                <CloseIcon className={styles.closeIcon} onClick={props.onClick} />
                <p>Select number of people</p>
                <div className={styles.peoples}>
                    {people.map((number,index) => {
                        return (
                            <p onClick={()=>clickHandler(number)} key={index}>
                                {number}
                            </p>
                        )
                    })}
                </div>
            </div>

        </Overlay>
    )
}

export default SelectPersonOverlay