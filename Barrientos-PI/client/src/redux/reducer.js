import {
    CLEAN_DETAIL,
    FETCH_BY_ID,
    FETCH_BY_NAME,
    FETCH_VIDEOGAMES,
    FILTER_BY_ALPHA,
    FILTER_BY_GENRE,
    FILTER_BY_ORIGIN,
    FILTER_BY_RATING,
    SAVE_VIDEOGAME,
    REMOVE_SAVED_VIDEOGAME
  } from "./actions-types";
  
  const initialState = {
    allVideogames: [],
    filteredVideogames: [],
    detailedVideogame: {},
    savedVideogames: []
  };
  
  const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_VIDEOGAMES:
        return {
          ...state,
          allVideogames: payload,
        };
      case FETCH_BY_ID:
        return {
          ...state,
          detailedVideogame: payload,
        };
      case FETCH_BY_NAME:
        return {
          ...state,
          filteredVideogames: payload,
        };
      case CLEAN_DETAIL:
        return {
          ...state,
          detailedVideogame: {},
        };
      case SAVE_VIDEOGAME:
        return {
          ...state,
          savedVideogames: [...state.savedVideogames, payload]
        };
      case REMOVE_SAVED_VIDEOGAME:
        const updatedSavedVideogames = state.savedVideogames.filter(
          (game) => game.id !== payload
        );
        return {
          ...state,
          savedVideogames: updatedSavedVideogames
        };
      case FILTER_BY_GENRE:
        let filteredByGenre = state.filteredVideogames.length ? state.filteredVideogames : state.allVideogames
        filteredByGenre = filteredByGenre.filter((game) =>
              game.genres?.some((genre) => genre === payload)
          );
          return {
              ...state,
              filteredVideogames: filteredByGenre,
          };        
      case FILTER_BY_ORIGIN:
        let filteredByOrigin = state.filteredVideogames.length ? state.filteredVideogames : state.allVideogames
          if (payload === "API") {
            filteredByOrigin = filteredByOrigin.filter((game) => typeof(game.id) === 'number')
          }
          if (payload === "DB") {
            filteredByOrigin = filteredByOrigin.filter((game) => typeof(game.id) === 'string')
          } 
          return {
            ...state,
            filteredVideogames: filteredByOrigin,
          };
      case FILTER_BY_ALPHA:
        let allVideogamesCopy1 =  state.filteredVideogames.length ? state.filteredVideogames : state.allVideogames;
          if (payload === "A") {
            allVideogamesCopy1 = allVideogamesCopy1.sort((a, b) => a.name.localeCompare(b.name))
          }
          if (payload === "D") {
            allVideogamesCopy1 = allVideogamesCopy1.sort((a, b) => b.name.localeCompare(a.name))
          }
          return {
            ...state,
            filteredVideogames: allVideogamesCopy1
          };
      case FILTER_BY_RATING:
        let allVideogamesCopy2 = state.filteredVideogames.length ? state.filteredVideogames : state.allVideogames;
          if(payload === "BEST") {
            allVideogamesCopy2 = allVideogamesCopy2.sort((a, b) => b.rating - a.rating);
          }
          if(payload === "WORST") {
            allVideogamesCopy2 = allVideogamesCopy2.sort((a, b) => a.rating - b.rating);
          }
          return {
              ...state,
              filteredVideogames: allVideogamesCopy2,
          };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  