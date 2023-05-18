import React, { useEffect, useState} from "react";
import { fetchById, cleanDetail } from "../../redux/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import styles from './Detail.module.css';
import { Link } from 'react-router-dom'

export const Detail = ({videogame, fetchById, cleanDetail}) => {

    const { id } = useParams();
    const regex = /(<([^>]+)>)/ig;

    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    useEffect(() => {
        fetchById(id)
        return cleanDetail()
    }, [fetchById, cleanDetail, id])

    if (!videogame) {
      return <div>Loading...</div>;
    }
     
    return (
        <div className={styles.detailContainer}>
          <div>
              <Link to="/home">
                <button className={styles.backButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M20.59 12H5.41l4.29-4.29a1 1 0 1 0-1.42-1.42l-6 6a1 1 0 0 0 0 1.42l6 6a1 1 0 0 0 1.42-1.42L5.41 12h15.18z"/>
                  </svg>
                </button>
              </Link>
          </div>
          <div className={styles.title}>
            <h1>{videogame.name}</h1>
          </div>
          <div className={styles.rating}>
              <span className={styles.subtitle}>Rating</span>
              <span>{videogame.rating}</span>
            </div>
            <div className={styles.release}>
              <span className={styles.subtitle}>Release date</span>
              <span>{videogame.releaseDate}</span>
            </div>
            
            <div className={styles.genres}>
            <span className={styles.subtitle} >Genres</span>
                  <div className={styles.genresRow}>
                  <ul>
                      {videogame.genres?.map((genre, index) => {
                      return <li key={index}>{genre}</li>;
                      })}
                  </ul>
                  </div>
              </div>
            <div className={styles.platforms}>
            <span className={styles.subtitle}>Platforms</span>
                <div className={styles.platformsRow}>
                <ul>
                    {videogame.platforms?.map((platform, index) => {
                    return <li key={index}>{platform}</li>;
                    })}
                </ul>
                </div>
            </div>
          <div className={styles.imageContainer}>
            <img src={videogame.image} alt={videogame.name} className={styles.image} />
          </div>
          <div className={styles.descriptionRow}>
            <div className={styles.description}>
              <p>
                {showDescription
                  ? videogame.description?.replace(regex, "")
                  : videogame.description?.replace(regex, "")?.substring(0, 200) + "..."}
              </p>
              {videogame.description?.length > 200 && (
                <button className={styles.readMore} onClick={toggleDescription}>
                  {showDescription ? "Read less" : "Read more"}
                </button>
              )}
            </div>
            <div className={styles.saveButtonRow}>
                {typeof id === 'number' && !Number.isNaN(id) && !id.includes('-') && (
                  <button className={styles.saveButton}>Save</button>
                )}
            </div>

          </div>
        </div>
      );

};

const mapStateToProps = (state) => {
    return {
      videogame: state.detailedVideogame
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchById: (id) => { dispatch(fetchById(id))},
        cleanDetail: () => { dispatch(cleanDetail())}
    };
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Detail);
