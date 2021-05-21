import React from 'react'
import styles from './Content.module.css'

const Shows = (props) => {
    let shows = props.showsList.map(s =>
        <div className={styles.contentCard}>
            <span>{ s.title }</span>
            <img className={styles.contentPhoto} src={s.image}/>
            <span>Year: {s.year}</span>
            <span>Genre: {s.genre}</span>
            <span>Rating: {s.rating}</span>
            <button>Watch online</button>
        </div>
        )
    return(
        <div>
            <div className={styles.typeText}>TV SHOWS</div>
            <div className={styles.content_wrapper}>
                { shows }
            </div>
        </div>
    )
}

export default Shows;