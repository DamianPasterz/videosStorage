
const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_MOVIE":
			return { ...state, movies: [...state.movies, action.payload] };
		case "GET_MOVIE_BEGIN":
			return { ...state, isLoading: true };
		case "GET_MOVIE_END":
			return { ...state, isLoading: false };
		case "SET_ALERT":
			return { ...state, alert: action.payload };
		case "TOGGLE_FAV":
			const favMovies = state.movies.map(item => {
				if (item.id === action.payload) {
					return { ...item, favourite: !item.favourite };
				} else return item;
			});
			return { ...state, movies: favMovies };
		case "REMOVE_MOVIE":
			const filteredMovies = state.movies.filter(
				item => item.id !== action.payload
			);
			return { ...state, movies: filteredMovies };
		case "CLEAR_ALL":
			return { ...state, movies: [] };
		default:
			return console.log(`WROCNG: ${action.type}`);
	}
};

export default reducer;
