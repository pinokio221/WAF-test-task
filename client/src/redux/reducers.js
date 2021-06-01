import { api } from "../api/api";

const SET_CONTENT = "SET-CONTENT";
const ADD_ITEM = "ADD_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const SET_EDITED_ITEM = "SET_EDITED_ITEM";

export const setContentAction = (shows, movies, totalShows, totalMovies) => ({
  type: SET_CONTENT,
  shows,
  movies,
});

export const addNewItemAction = (data) => ({ type: ADD_ITEM, data });
export const updateItemAction = (data) => ({ type: UPDATE_ITEM, data });
export const removeItemAction = (id, category) => ({
  type: REMOVE_ITEM,
  id,
  category,
});
export const setEditedItem = (item) => ({ type: SET_EDITED_ITEM, item });

let initialState = {
  shows: [],
  movies: [],
  editedItem: null,
  totalShows: null,
  totalMovies: null,
};

export const getContent = () => {
  return (dispatch) => {
    let getShowsPromise = api.getShows();
    let getMoviesPromise = api.getMovies();
    Promise.all([getShowsPromise, getMoviesPromise]).then((response) => {
      dispatch(
        setContentAction(
          response[0].data.shows,
          response[1].data.movies,
          response[0].data.totalShows,
          response[1].data.totalMovies
        )
      );
    });
  };
};

export const addItem = (data) => {
  return (dispatch) => {
    api.addItem(data).then((response) => {
      if (response.status === 201) {
        dispatch(addNewItemAction(response.data));
      }
    });
  };
};

export const updateItem = (data) => {
  return (dispatch) => {
    api.updateItem(data).then((response) => {
      if (response.status === 200) {
        dispatch(updateItemAction(response.data));
      }
    });
  };
};

export const removeItem = (id, category) => {
  return (dispatch) => {
    api.removeItem(id, category).then((response) => {
      if (response.status === 200) {
        dispatch(
          removeItemAction(response.data.item.id, response.data.category)
        );
      }
    });
  };
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return {
        ...state,
        shows: action.shows,
        movies: action.movies,
        totalShows: action.totalShows,
        totalMovies: action.totalMovies,
      };
    case ADD_ITEM:
      if (action.data.category == "show") {
        return {
          ...state,
          shows: [...state.shows, action.data.value],
        };
      }
      if (action.data.category == "movie") {
        return {
          ...state,
          movies: [...state.movies, action.data.value],
        };
      }
    case UPDATE_ITEM:
      if (action.data.category === "show") {
          console.log(action.data)
        return {
          ...state,
          editedItem: null,
          shows: state.shows.map((s) => {
            if (s.id === action.data.item.id) {
              return { ...action.data.item };
            }
            return s;
          }),
        };
      }
      if (action.data.category === "movie") {
        return {
          ...state,
          editedItem: null,
          movies: state.movies.map((s) => {
            if (s.id === action.data.item.id) {
              return { ...action.data.item };
            }
            return s;
          }),
        };
      }
    case SET_EDITED_ITEM: {
      return {
        ...state,
        editedItem: action.item,
      };
    }
    case REMOVE_ITEM:
      if (action.category == "show") {
        state.shows.map((s) => {
          if (s.id === action.id) {
            let index = state.shows.indexOf(s);
            state.shows.splice(index, 1);
          }
        });
        return {
          ...state,
          shows: [...state.shows],
        };
      }
      if (action.category == "movie") {
        state.movies.map((m) => {
          if (m.id === action.id) {
            let index = state.movies.indexOf(m);
            state.movies.splice(index, 1);
          }
        });
        return {
          ...state,
          movies: [...state.movies],
        };
      }

    default:
      return state;
  }
};

export default contentReducer;
