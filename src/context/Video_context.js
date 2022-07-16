import React, { useContext, useEffect, useReducer } from 'react'
import reducer from "../context/Film_reducer"
import fetchItem from '../tools/fetchItem'






const initLocalStorage = () => {
    let data = localStorage.getItem('video');
    if (data) return JSON.parse(localStorage.getItem('video'));
    else return [];
};



const initialState = {
    movies: initLocalStorage(),
    provider: '',
    vimeo_movies: [],
    alert: { show: false, type: 'success', msg: '' },
    isLoading: false,
};




export const VideoContext = React.createContext();
export const VideoProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(state.movies));
    }, [state.movies]);



    const isPresent = item =>
        state.movies.findIndex(movie => movie.movieUrl === item.movieUrl) !== -1;


    const addItem = (inputSearch, provider) => {
        dispatch({ type: "GET_MOVIE_BEGIN" });
        fetchItem(inputSearch, provider)
            .then(newItem => {
                if (isPresent(newItem)) {
                    dispatch({ type: "GET_MOVIE_END" });
                    return setAlert(
                        true,
                        'The movie is already in your list!',
                        'warning',

                    );
                }
                dispatch({ type: "ADD_MOVIE", payload: newItem });
                setAlert(
                    true,
                    'Movie successfully added to the list!',
                    'success',

                );
                dispatch({ type: "GET_MOVIE_END" });
            })

    };


    const setAlert = (
        show = false,
        msg = '',
        type = state.alert.type,

    ) => {
        dispatch({ type: "SET_ALERT", payload: { show, msg, type } });
    };


    const removeFilm = id => {
        dispatch({ type: "REMOVE_MOVIE", payload: id });
    };
    const clearfilms = () => dispatch({ type: "CLEAR_ALL" });
    const toggleFavourites = id => dispatch({ type: "TOGGLE_FAV", payload: id });





    return (
        <VideoContext.Provider
            value={{
                ...state,
                addItem,
                removeFilm,
                toggleFavourites,
                clearfilms,

            }
            }>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideoContext = () => {
    return useContext(VideoContext);
};
