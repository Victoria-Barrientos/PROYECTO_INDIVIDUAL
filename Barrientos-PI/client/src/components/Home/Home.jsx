import React, { useState, useEffect } from "react";
import { fetchVideogames } from "../../redux/actions";
import { connect } from "react-redux";
import { Card } from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Home.module.css';
import Filter from "../Filter/Filter";

export const Home = ({videogames, filteredVideogames, fetchVideogames}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const gamesToPaginate = filteredVideogames.length > 0 ? filteredVideogames : videogames;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentGames = gamesToPaginate.slice(indexOfFirstItem, indexOfLastItem);
   
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  
    useEffect(() => {
        fetchVideogames()
    }, [fetchVideogames]);
    
    return (
        <div className={styles.homeContainer}>
          <div className={styles.homeBar}>
              <SearchBar></SearchBar>
              <Filter></Filter>
          </div>
          <div>
              <button onClick={goToPreviousPage} disabled={currentPage === 1} className={styles.paginationButton}>
              &#8592;</button>
              <span className={styles.currentPage}>{currentPage}</span>
              <button onClick={goToNextPage} disabled={indexOfLastItem >= videogames.length} className={styles.paginationButton}>
              &#8594;</button>
          </div>
        
        <div className={styles.homeCardContainer}>
          {currentGames.length === 0 ? (
          <p>No matching results found.</p>
        ) : (
          currentGames.map((game) => {
            return (
              <Card
                key={game.id}
                id={game.id}
                name={game.name}
                image={game.image}
                genres={game.genres}
                rating={game.rating}
              />
            );
          })
        )}
          </div>
        </div>
      );
};

const mapStateToProps = (state) => {
    return {
      videogames: state.allVideogames,
      filteredVideogames: state.filteredVideogames
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVideogames: () => { dispatch(fetchVideogames())}
    };
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Home);

  