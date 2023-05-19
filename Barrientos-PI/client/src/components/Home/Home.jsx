import React, { useEffect } from "react";
import { fetchVideogames } from "../../redux/actions";
import { connect } from "react-redux";
import { Card } from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Home.module.css';
import Filter from "../Filter/Filter";

export const Home = ({videogames, filteredVideogames, fetchVideogames}) => {

    useEffect(() => {
        fetchVideogames()
    }, [fetchVideogames]);
    
    return (
        <div className={styles.homeContainer}>
          <div>
            <SearchBar></SearchBar>
            <Filter></Filter>
          </div>
          <div>Here is the pagination component</div>
          <div className={styles.homeCardContainer}>
            {filteredVideogames.length === 0 
              ? ( <p>No matching results found.</p>)
              : ( filteredVideogames.map((game) => {
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
          <h2>All videogames</h2>
          <div className={styles.homeCardContainer}>
            {videogames?.map((game) => {
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
            })}
          </div>
          <div>Here is the pagination component</div>
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

  