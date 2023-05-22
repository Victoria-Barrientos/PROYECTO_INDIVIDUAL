import React from "react";
import { connect } from "react-redux";
import { fetchByName } from "../../redux/actions";
import styles from './SearchBar.module.css';


export const SearchBar = ({fetchByName}) => {

    const handleChange = (event) => {
        fetchByName(event.target.value)
    }

    return (
        <div className={styles.searchContainer}>
          <label htmlFor="search-input" className={styles.searchLabel}> Search
          </label>
          <input id="search-input" type="search" className={styles.searchInput} onChange={handleChange} />
        </div>
      );
};


const mapDispatchToProps = (dispatch) => {
    return {
        fetchByName: (name) => { dispatch(fetchByName(name))}
    }
};

export default connect(
    null,
    mapDispatchToProps
)(SearchBar);