import { Link } from 'react-router-dom';
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.container}>
      <Link to='/' className={styles.link}><h1 className={styles.logo}>Pixel Playground</h1></Link>
      <button className={styles.navButton} id="loginBtn">Login</button>
    </div>
  );
}


