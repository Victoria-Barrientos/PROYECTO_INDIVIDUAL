import React from 'react';
import styles from "./Card.module.css";
import { Link } from 'react-router-dom'

export const Card = ({name, image, genres, id, rating}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <div className={styles.cardDetails}>
        <h3>{name}</h3>
        <ul>
          { 
            genres?.map((genre, index) => {
              return (
                <li key={index}>{genre}</li>
              )
            })
          }
        </ul>
        <div className={styles.lastRow}>
          
          <p><span>&#9733;</span>{rating}</p>
          <Link to={`/detail/${id}`} className={styles.link}>
            <button className={styles.cardButton}>Learn more</button>
          </Link>
        </div>

      </div>
    </div>
  )
  }