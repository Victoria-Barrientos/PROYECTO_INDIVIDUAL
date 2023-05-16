import { useState } from 'react';
import { connect } from "react-redux";
import { filterByGenre, filterByOrigin, filterByRating, orderVideogames } from '../../redux/actions';
import styles from './Filter.module.css';

export const Filter = ({orderVideogames, filterByGenre, filterByOrigin, filterByRating}) => {
    const [selectedOrder, setSelectedOrder] = useState('D');
    const [selectedFilter, setSelectedFilter] = useState('Genre');
    const [selectedGenre, setSelectedGenre] = useState('Action');
    const [selectedOrigin, setSelectedOrigin] = useState('API');
    const [selectedRating, setSelectedRating] = useState('BEST');


    const handleFilterChange = (event) => {
        const filter = event.target.value
        setSelectedFilter(filter);
    };

    const handleOrderChange = (event) => {
        const order = event.target.value
        setSelectedOrder(order);
        orderVideogames(order)
    };

    const handleGenre = (event) => {
        const genre = event.target.value;
        setSelectedGenre(genre)
        filterByGenre(genre)
    }

    const handleRating = (event) => {
        const rating = event.target.value;
        setSelectedRating(rating)
        filterByRating(rating)
    }

    const handleOrigin = (event) => {
        const origin = event.target.value;
        setSelectedOrigin(origin)
        filterByOrigin(origin)
    }

  return (
    <div className={styles.filterContainer}>

        <div className={styles.selectContainer}>
        <label>Order</label>
        <select value={selectedOrder} onChange={handleOrderChange} className={styles.select}>
            <option value="A">A-Z</option>
            <option value="D">Z-A</option>
        </select>
        </div>

        <div className={styles.selectContainer}>
        <label>Filter by</label>
        <select value={selectedFilter} onChange={handleFilterChange} className={styles.select}>
            <option value=""></option>
            <option value="Genre">Genre</option>
            <option value="Origin">Origin</option>
            <option value="Rating">Rating</option>
        </select>
        </div>

        <div className={styles.filterSection}>
        {selectedFilter === 'Origin' && (
            <div className={styles.selectContainer}>
                <label>Origin</label>
                <select value={selectedOrigin} onChange={handleOrigin} className={styles.select}>
                    <option value="API">API</option>
                    <option value="DB">DB</option>
                </select>
            </div>
        )}

        {selectedFilter === 'Rating' && (
            <div className={styles.selectContainer}>
                <label>Rating</label>
                <select value={selectedRating} onChange={handleRating} className={styles.select}>
                    <option value="BEST">Best - Worst</option>
                    <option value="WORST">Worst - Best</option>
                </select>
            </div>
        )}

        {selectedFilter === 'Genre' && (
            <div className={styles.selectContainer}>
                <label>Genres</label>
                <select value={selectedGenre} className={styles.select} onChange={handleGenre}>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Card">Card</option>
                    <option value="Casual">Casual</option>
                    <option value="Educational">Educational</option>
                    <option value="Family">Family</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Indie">Indie</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Racing">Racing</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="RPG">RPG</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Sports">Sports</option>
                    <option value="Strategy">Strategy</option>
                </select>
            </div>
        )}
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderVideogames: (order) => { dispatch(orderVideogames(order)) },
        filterByGenre: (genre) => { dispatch(filterByGenre(genre)) },
        filterByOrigin: (origin) => { dispatch(filterByOrigin(origin))},
        filterByRating: (rating) => { dispatch(filterByRating(rating))}
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Filter);

