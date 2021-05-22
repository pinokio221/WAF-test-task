import React from 'react'
import Shows from './Shows'
import Movies from './Movies'
import styles from './Content.module.css'
import { connect } from 'react-redux';
import { getContent, updateItem, removeItem, setEditedItem } from '../../redux/reducers'

class Content extends React.Component {
    componentDidMount() {
        this.props.getContent();
    }
    updateItem = (data) => {
        this.props.updateItem(data);
    }
    removeItem = (id, category) => {
        this.props.removeItem(id, category);
    }
    render() {
        return(
            <div className={styles.wrapper}>
                <Shows 
                    showsList={this.props.showsList} 
                    updateItem={this.updateItem} 
                    removeItem={this.removeItem}
                    setEditedItem={this.props.setEditedItem}
                    />
                <Movies 
                    moviesList={this.props.moviesList} 
                    updateItem={this.updateItem} 
                    removeItem={this.removeItem}
                    setEditedItem={this.props.setEditedItem}
                    />
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
export default connect(mapStateToProps, { getContent, updateItem, removeItem, setEditedItem })(Content);