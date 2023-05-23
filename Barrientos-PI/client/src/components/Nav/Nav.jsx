import { Link } from 'react-router-dom';
import styles from "./Nav.module.css";

export default function Nav() {

  return (
    <div className={styles.container}>
      <Link to='/' className={styles.link}><h1 className={styles.logo}>PIXELS PLAYGROUND</h1></Link>
      <div className={styles.buttonContainer}>
      <Link to='/home' className={styles.link}><h1 className={styles.button}>Home</h1></Link>
      <Link to='/saved' className={styles.link}><h1 className={styles.button}>Saved</h1></Link>
      <Link to='/new' className={styles.link}><h1 className={styles.button}>New</h1></Link>
      <Link to='/login' className={styles.link}><h1 className={styles.button} id="loginBtn">Login</h1></Link>
      </div>
    </div>
  );
}


