import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { filterByGenre, filterByOrigin, filterByLetter, filterByRating, setSelectedOrder, setSelectedFilters } from '../../redux/actions';
import styles from './Filter.module.css';

export const Filter = ({filterByGenre, filterByOrigin, filterByLetter, filterByRating,
    selectedFilters, selectedOrder, setSelectedOrder, setSelectedFilters}) => {

        const [localFilters, setLocalFilters] = useState(selectedFilters);
        const [localOrder, setLocalOrder] = useState(selectedOrder);

    const handleOrderChange = (event) => {
        const order = event.target.value
        setLocalOrder(order);
    };

    const handleFilters = (event) => {
        const type = event.target.name;
        const filter = event.target.value;

        setLocalFilters({
            ...localFilters,
            [type]: filter
        });
      };

      useEffect(() => {
        setSelectedFilters(localFilters);
      }, [localFilters, setSelectedFilters]);

      useEffect(() => {
        setSelectedOrder(localOrder);
      }, [localOrder, setSelectedOrder]);

      useEffect(() => {
        filterByLetter(localFilters);
        filterByRating(localFilters);
        filterByGenre(localFilters);
        filterByOrigin(localFilters);
      }, [localFilters, filterByLetter, filterByRating, filterByGenre, filterByOrigin]);
    
      
  return (
    <div className={styles.filterComponent}>
        <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>Order by</label>
            <div className={styles.filterSection}>
                <div className={styles.selectContainer}>
                <select value={localOrder} onChange={handleOrderChange} className={styles.select}>
                    <option></option>
                    <option value="Alpha">Alphabetically</option>
                    <option value="Rating">Rating</option>
                </select>
                </div>

                {
                    selectedOrder === "Rating" && (
                        <div className={styles.selectContainer}>
                            <label>Rating</label>
                            <select name="Rating" value={localFilters?.Rating} onChange={handleFilters} className={styles.select}>
                                <option></option>
                                <option value="BEST">Best - Worst</option>
                                <option value="WORST">Worst - Best</option>
                            </select>
                        </div>
                    )
                }

                {
                    selectedOrder === "Alpha" && (
                        <div className={styles.selectContainer}>
                            <label>Alphabetically</label>
                            <select name="Alpha" value={localFilters?.Alpha} onChange={handleFilters} className={styles.select}>
                                <option></option>
                                <option value="A">A-Z</option>
                                <option value="D">Z-A</option>
                            </select>
                        </div>
                    )
                }

            </div>
        </div>
            
            <div className={styles.filterContainer}>
            <label className={styles.filterLabel}>Filter by</label>
            <div className={styles.filterSection}>
                <div className={styles.selectContainer}>
                    <label>Origin</label>
                    <select name="Origin" value={localFilters?.Origin} onChange={handleFilters} className={styles.select}>
                        <option></option>
                        <option value="API">API</option>
                        <option value="DB">DB</option>
                    </select>
                </div>
                
                <div className={styles.selectContainer}>
                <label>Genres</label>
                <select name="Genre" value={localFilters?.Genre} onChange={handleFilters} className={styles.select}>
                    <option></option>
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

            </div>
            </div>
        

        </div>
  );
}

const mapStateToProps = (state) => {
    return {
      selectedFilters: state.selectedFilters,
      selectedOrder: state.selectedOrder
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        filterByLetter: (localFilters) => { dispatch(filterByLetter(localFilters)) },
        filterByGenre: (localFilters) => { dispatch(filterByGenre(localFilters)) },
        filterByOrigin: (localFilters) => { dispatch(filterByOrigin(localFilters))},
        filterByRating: (localFilters) => { dispatch(filterByRating(localFilters))},
        setSelectedOrder: (order) => { dispatch(setSelectedOrder(order))},
        setSelectedFilters: (localFilters) => { dispatch(setSelectedFilters(localFilters)) }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);




// export const Filter = ({filterByGenre, filterByOrigin, filterByLetter, filterByRating}) => {

//     const [selectedFilters, setSelectedFilters] = useState({});
//     const [selectedOrder, setSelectedOrder] = useState();

//     const handleOrderChange = (event) => {
//         const order = event.target.value
//         setSelectedOrder(order);
//     };

//     const handleFilters = (event) => {
//         const type = event.target.name;
//         const filter = event.target.value
//         setSelectedFilters({
//             ...selectedFilters,
//             [type]: filter
//         });
//         filterByLetter(selectedFilters);
//         filterByRating(selectedFilters);
//         filterByGenre(selectedFilters);
//         filterByOrigin(selectedFilters);
//       };
      
//       useEffect(() => {
//         filterByLetter(selectedFilters);
//         filterByRating(selectedFilters);
//         filterByGenre(selectedFilters);
//         filterByOrigin(selectedFilters);
//       }, [selectedFilters, filterByLetter, filterByRating, filterByGenre, filterByOrigin]);

//   return (
//     <div className={styles.filterComponent}>
//         <div className={styles.filterContainer}>
//         <label className={styles.filterLabel}>Order by</label>
//             <div className={styles.filterSection}>
//                 <div className={styles.selectContainer}>
//                 <select value={selectedOrder} onChange={handleOrderChange} className={styles.select}>
//                     <option></option>
//                     <option value="Alpha">Alphabetically</option>
//                     <option value="Rating">Rating</option>
//                 </select>
//                 </div>

//                 {
//                     selectedOrder === "Rating" && (
//                         <div className={styles.selectContainer}>
//                             <label>Rating</label>
//                             <select name="Rating" value={selectedFilters.Rating} onChange={handleFilters} className={styles.select}>
//                                 <option></option>
//                                 <option value="BEST">Best - Worst</option>
//                                 <option value="WORST">Worst - Best</option>
//                             </select>
//                         </div>
//                     )
//                 }

//                 {
//                     selectedOrder === "Alpha" && (
//                         <div className={styles.selectContainer}>
//                             <label>Alphabetically</label>
//                             <select name="Alpha" value={selectedFilters.Alpha} onChange={handleFilters} className={styles.select}>
//                                 <option></option>
//                                 <option value="A">A-Z</option>
//                                 <option value="D">Z-A</option>
//                             </select>
//                         </div>
//                     )
//                 }

//             </div>
//         </div>
            
//             <div className={styles.filterContainer}>
//             <label className={styles.filterLabel}>Filter by</label>
//             <div className={styles.filterSection}>
//                 <div className={styles.selectContainer}>
//                     <label>Origin</label>
//                     <select name="Origin" value={selectedFilters.Origin} onChange={handleFilters} className={styles.select}>
//                         <option></option>
//                         <option value="API">API</option>
//                         <option value="DB">DB</option>
//                     </select>
//                 </div>
                
//                 <div className={styles.selectContainer}>
//                 <label>Genres</label>
//                 <select name="Genre" value={selectedFilters.Genre} onChange={handleFilters} className={styles.select}>
//                     <option></option>
//                     <option value="Action">Action</option>
//                     <option value="Adventure">Adventure</option>
//                     <option value="Arcade">Arcade</option>
//                     <option value="Board Games">Board Games</option>
//                     <option value="Card">Card</option>
//                     <option value="Casual">Casual</option>
//                     <option value="Educational">Educational</option>
//                     <option value="Family">Family</option>
//                     <option value="Fighting">Fighting</option>
//                     <option value="Indie">Indie</option>
//                     <option value="Massively Multiplayer">Massively Multiplayer</option>
//                     <option value="Racing">Racing</option>
//                     <option value="Platformer">Platformer</option>
//                     <option value="Puzzle">Puzzle</option>
//                     <option value="RPG">RPG</option>
//                     <option value="Shooter">Shooter</option>
//                     <option value="Simulation">Simulation</option>
//                     <option value="Sports">Sports</option>
//                     <option value="Strategy">Strategy</option>
//                 </select>
//                 </div>

//             </div>
//             </div>
        

//         </div>
//   );
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         filterByLetter: (selectedFilters) => { dispatch(filterByLetter(selectedFilters)) },
//         filterByGenre: (selectedFilters) => { dispatch(filterByGenre(selectedFilters)) },
//         filterByOrigin: (selectedFilters) => { dispatch(filterByOrigin(selectedFilters))},
//         filterByRating: (selectedFilters) => { dispatch(filterByRating(selectedFilters))},
//     }
// }

// export default connect(
//     null,
//     mapDispatchToProps
// )(Filter);

