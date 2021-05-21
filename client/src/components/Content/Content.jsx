import React from 'react'
import Shows from './Shows'
import Movies from './Movies'
import styles from './Content.module.css'
import { connect } from 'react-redux';
import { getContent } from '../../redux/reducers'

class Content extends React.Component {
    componentDidMount() {
        this.props.getContent();
    }
    render() {
        return(
            <div className={styles.wrapper}>
                <Shows showsList={this.props.showsList}/>
                <Movies moviesList={this.props.moviesList}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        showsList: state.content.shows,
        moviesList: state.content.movies
    }
}
export default connect(mapStateToProps, { getContent })(Content);