import styles from './styles.module.css'

const Overlay = (props) => {
    return (
        <div className={styles.overlay} {...props}>
           { props.children}
        </div>
    )
}

export default Overlay