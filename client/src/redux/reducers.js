import { api } from '../api/api'

const SET_CONTENT = 'SET-CONTENT';
const ADD_ITEM = 'ADD_ITEM';

export const setContentAction = (shows, movies, totalShows, totalMovies) => ({ type: SET_CONTENT, shows, movies })
export const addNewItemAction = (data) => ({ type: ADD_ITEM, data});

let initialState = {
    shows: [],
    movies: [],
    totalShows: null,
    totalMovies: null
}

export const getContent = () => {
    return(dispatch) => {
        let getShowsPromise = api.getShows();
        let getMoviesPromise = api.getMovies();
        Promise.all([getShowsPromise, getMoviesPromise]).then((response) => {
            dispatch(setContentAction(
                response[0].data.shows, response[1].data.movies, 
                response[0].data.totalShows, response[1].data.totalMovies))
        })
    } 
}

export const addItem = (data) => {
    return(dispatch) => {
        api.addItem(data).then((response) => {
            if(response.status === 201) {
                dispatch(addNewItemAction(response.data));
            }
        })
    } 
}


const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTENT:
            return {
                ...state,
                shows: action.shows,
                movies: action.movies,
                totalShows: action.totalShows,
                totalMovies: action.totalMovies
            }
        case ADD_ITEM:
            console.log(action)
            if(action.data.category == "show") {
                return {
                    ...state,
                    shows: [...state.shows, action.data.value]
                }
            }
            if(action.data.category == "movie") {
                return {
                    ...state,
                    shows: [...state.movies, action.data.value]
                }
            }
            
        default:
            return state;
    }
}

export default contentReducer;