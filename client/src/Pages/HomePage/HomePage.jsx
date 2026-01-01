import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

function HomePage() {
	return (
		<section className={styles.hero}>
			<div className={styles.heroContent}>
				<h1 className={styles.title}>¡Bienvenida a <span className={styles.brand}>Pinky Cosmetics</span>!</h1>
				<p className={styles.subtitle}>
					Descubre la magia del maquillaje, productos de alta calidad y las últimas tendencias en belleza. ¡Haz brillar tu look con nuestro toque rosa!
				</p>
				<Link to="/productos" ><p  className={styles.cta}>Ver productos</p></Link>
			</div>
			<div className={styles.heroImage}></div>
		</section>
	);
}

export default HomePage;
