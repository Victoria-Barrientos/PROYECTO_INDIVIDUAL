import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing() {
   return (
    <div className={styles.container}>
        <h1>Welcome to Pixel Playground</h1>
        <h2>From classics to hidden gems, we've got the games you love</h2>
        <p>We offer a comprehensive database of videogames from a wide range of genres and platforms.
            Discover new games - <span>Who knows what new adventures await?</span></p>
        {/* register if not logged in, home page if logged in */}
        <Link to='/home'><button className={styles.landingButton}>Get started now</button></Link>
    </div>
   )
}
