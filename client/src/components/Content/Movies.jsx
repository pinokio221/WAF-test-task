import React from 'react'
import styles from './Content.module.css'

const Movies = (props) => {
    let movies = props.moviesList.map(m =>
        <div className={styles.contentCard}>
            <span>{ m.title }</span>
            <img className={styles.contentPhoto} src={m.image}/>
            <span>Year: {m.year}</span>
            <span>Genre: {m.genre}</span>
            <span>Rating: {m.rating}</span>
            <button>Watch online</button>
        </div>
        )
    return(
        <div>
            <div className={styles.typeText}>Movies</div>
            <div className={styles.content_wrapper}>
                { movies }
            </div>
        </div>
    )
}

export default Movies;