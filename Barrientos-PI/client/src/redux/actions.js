import axios from 'axios';
import { 
  FETCH_VIDEOGAMES, FETCH_BY_ID, FETCH_BY_NAME, CLEAN_DETAIL,
  ORDER_VIDEOGAMES, FILTER_BY_GENRE, FILTER_BY_ORIGIN, FILTER_BY_RATING} from './actions-types';

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

export const orderVideogames = (order) => {
  return {
    type: ORDER_VIDEOGAMES,
    payload: order
  }
};

export const filterByGenre = (genre) => {
  return {
    type: FILTER_BY_GENRE,
    payload: genre
  }
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin
  }
};

export const filterByRating = (rating) => {
  return {
    type: FILTER_BY_RATING,
    payload: rating
  }
};