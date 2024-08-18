import ContinueReading from '../continue-reading';
import styles from './main-post.module.scss';

function MainPost({ article }) {
    const { title, description, image, url } = article || {};

    return article && (  
        <div className={styles.mainPost}>
            <div className={styles.imgContainer}>
                <img src={image} alt={title} className={styles.bgImage} />
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{title}</h1>
                <p>{description}</p>
                <ContinueReading url={url} customCss={styles.link} />
            </div>
        </div>
    );
}

export default MainPost;