import { CLEAN_DETAIL, FETCH_BY_ID, FETCH_BY_NAME, FETCH_VIDEOGAMES, ORDER_VIDEOGAMES, FILTER_BY_GENRE, FILTER_BY_ORIGIN, FILTER_BY_RATING } from "./actions-types";

const initialState = {
    filteredVideogames: [],
    allVideogames: [],
    detailedVideogame: {}
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case FETCH_VIDEOGAMES: 
            return {
                ...state,
                allVideogames: payload
            };
        case FETCH_BY_ID:
            return {
                ...state,
                detailedVideogame: payload
            };
        case FETCH_BY_NAME:
            return {
                ...state,
                filteredVideogames: payload
            };
        case CLEAN_DETAIL:
            return {
                ...state,
                detailedVideogame: {}
            };
        case ORDER_VIDEOGAMES:
            const allVideogamesCopy = [...state.allVideogames]
            return {
                ...state,
                allVideogames: 
                    payload === "A"
                    ? allVideogamesCopy.sort((a, b) => a.name.localeCompare(b.name))
                    : allVideogamesCopy.sort((a, b) => b.name.localeCompare(a.name))
            };
        case FILTER_BY_GENRE:
            return {
                ...state,
                filteredVideogames: 
                    state.allVideogames.filter((game) =>
                        game.genre?.some((genre) => genre.name === payload)
                    ),
            };
        case FILTER_BY_ORIGIN:
            return {
                ...state,
                filteredVideogames:
                    payload === "API"
                        ? state.allVideogames.filter((game) => typeof(game.id) === 'number' )
                        : state.allVideogames.filter((game) => typeof(game.id) === 'string' )
            };
        case FILTER_BY_RATING:
            const allVideogames2Copy = [...state.allVideogames]
            return {
                ...state,
                filteredVideogames:
                    payload === "BEST"
                        ? allVideogames2Copy.sort((a, b) => a.rating - b.rating)
                        : allVideogames2Copy.sort((a, b) => b.rating - a.rating)
            };
            default:
                return {
                    ...state
                };
    }
};

export default rootReducer;