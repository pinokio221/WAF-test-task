import React from 'react'
import Shows from './Shows'
import Movies from './Movies'
import styles from './Content.module.css'

const Content = (props) => {
    return(
        <div className={styles.wrapper}>
            <Shows/>
            <Movies/>
        </div>
    )
}

export default Content;