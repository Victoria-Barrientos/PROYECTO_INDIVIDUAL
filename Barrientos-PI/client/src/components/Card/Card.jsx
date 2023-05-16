import React from 'react';
import styles from "./Card.module.css";
import { Link } from 'react-router-dom'

export const Card = ({name, image, genre, id}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <div className={styles.cardDetails}>
        <h3>{name}</h3>
        <ul>
          { 
            genre?.map((gen) => {
              return (
                <li key={gen.id}>{gen.name}</li>
              )
            })
          }
        </ul>
        <Link to={`/detail/${id}`} className={styles.link}>
          <button className={styles.cardButton}>Learn more</button>
        </Link>
      </div>
    </div>
  )
  }