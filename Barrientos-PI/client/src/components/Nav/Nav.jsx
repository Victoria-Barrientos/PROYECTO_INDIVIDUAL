import { Link } from 'react-router-dom';
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.container}>
      <Link to='/' className={styles.link}><h1 className={styles.logo}>Pixel Playground</h1></Link>
      <div className={styles.navButtonContainer}>
      <Link to='/new' className={styles.link}><h1 className={styles.newButton}>+</h1></Link>
      <Link to='/login' className={styles.link}><button className={styles.logButton} id="loginBtn">Login</button></Link>
      </div>
    </div>
  );
}


