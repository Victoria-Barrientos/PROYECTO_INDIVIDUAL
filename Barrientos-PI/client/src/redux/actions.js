import axios from 'axios';
import { 
  FETCH_VIDEOGAMES, FETCH_BY_ID, FETCH_BY_NAME, CLEAN_DETAIL,
  FILTER_BY_ALPHA, FILTER_BY_GENRE, FILTER_BY_ORIGIN, FILTER_BY_RATING,
  SAVE_VIDEOGAME, REMOVE_SAVED_VIDEOGAME} from './actions-types';

const URL_BASE = 'http://localhost:3001/videogames'

export const fetchVideogames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_BASE}`);
      if(!data.length) throw Error('No hay videojuegos');
      return dispatch({
        type: FETCH_VIDEOGAMES,
        payload: data
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_BASE}/${id}`);
      if(!data) throw Error('No hay videojuegos con esa ID');
      return dispatch({
        type: FETCH_BY_ID,
        payload: data
      })
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const fetchByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_BASE}/search?name=${name}`);
      console.log(data)
      if(!data) throw Error('No hay videojuegos con ese nombre');
      return dispatch({
        type: FETCH_BY_NAME,
        payload: data
      })
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL
  }
};

export const saveVideogame = (videogame) => {
  return {
    type: SAVE_VIDEOGAME,
    payload: videogame
  }
};

export const removeSavedVideogame = (id) => {
  return {
    type: REMOVE_SAVED_VIDEOGAME,
    payload: id
  }
}

export const filterByLetter = (selectedFilters) => {
  return {
    type: FILTER_BY_ALPHA,
    payload: selectedFilters.Alpha
  }
};

export const filterByRating = (selectedFilters) => {
  return {
    type: FILTER_BY_RATING,
    payload: selectedFilters.Rating
  }
};

export const filterByGenre = (selectedFilters) => {
  return {
    type: FILTER_BY_GENRE,
    payload: selectedFilters.Genre
  }
};

export const filterByOrigin = (selectedFilters) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: selectedFilters.Origin
  }
};
