import ContinueReading from '../continue-reading';
import Skeleton from '../skeleton';
import LazyImage from '../../hooks/lazy-image';
import styles from './main-post.module.scss';

function MainPost({ article, loading }) {
    const { title, description, image, url } = article || {};

    return (          
        <div className={styles.mainPost}>
            <div className={styles.imgContainer}>
                {loading ? (
                    <Skeleton variant='image' />
                ) : (
                    <LazyImage src={image ? image : 'https://placehold.co/100010400?text=News'} alt={title} className={styles.bgImage} />
                )}
            </div>
            <div className={styles.textContainer}>
                {loading ? (
                    <>
                        <Skeleton height="38px" variant='heading' />
                        <Skeleton height="20px" variant='paragraph' />
                        <Skeleton height="20px" variant='paragraph' />
                        <Skeleton height="20px" variant='paragraph' />
                        <Skeleton width="100px" height="15px" />
                    </>
                ) : (
                    <>
                        <h1 className={styles.title}>{title}</h1>
                        <p>{description}</p>
                        {url && <ContinueReading url={url} customCss={styles.link} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default MainPost;