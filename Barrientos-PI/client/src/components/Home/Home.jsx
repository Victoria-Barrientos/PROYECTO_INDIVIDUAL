import React, { useState, useEffect } from "react";
import { fetchVideogames } from "../../redux/actions";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Card } from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Home.module.css';
import Filter from "../Filter/Filter";

export const Home = ({videogames, filteredVideogames, savedVideogames, fetchVideogames}) => {

  const location = useLocation()

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const gamesToPaginate = filteredVideogames.length > 0 ? filteredVideogames : videogames;

  const totalItems = gamesToPaginate.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentGames = gamesToPaginate.slice(indexOfFirstItem, indexOfLastItem);
   
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  
    useEffect(() => {
        fetchVideogames()
    }, [fetchVideogames]);
    
return (
  <div>
    {
    location.pathname === "/home" && 
    <div className={styles.homeContainer}>
      <div className={styles.homeBar}>
          <SearchBar></SearchBar>
          <Filter></Filter>
      </div>
      <div className={styles.paginationBox}>
          <button onClick={goToPreviousPage} disabled={currentPage === 1} className={styles.paginationButton}>
          &#8592;</button>
          <span className={styles.currentPage}>{currentPage}</span>
          <button onClick={goToNextPage} disabled={indexOfLastItem >= videogames.length || currentPage === totalPages} className={styles.paginationButton}>
          &#8594;</button>
      </div>
    
    <div className={styles.homeCardContainer}>
      {currentGames.length === 0 ? (
      <p>No matching results found.</p>
    ) : (
      currentGames.map((game) => {
        return (
          <>
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.image}
              genres={game.genres}
              rating={game.rating}
            />
          </>

        );
      })
    )}
      </div>
    </div>
    }
    {
      location.pathname === "/saved" &&
      <div>
          <h1>Saved videogames</h1>
          <div className={styles.homeCardContainer}>
          {savedVideogames.length === 0 ? (
          <p>No saved videogames</p>
          ) : (
            savedVideogames?.map((game) => {
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
    }
  </div>
  );
};

const mapStateToProps = (state) => {
    return {
      videogames: state.allVideogames,
      filteredVideogames: state.filteredVideogames,
      savedVideogames: state.savedVideogames
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

  