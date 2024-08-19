import PropTypes from 'prop-types';
import LazyImage from '../../hooks/lazy-image';
import Author from '../author';
import Skeleton from '../skeleton';
import { formatDate } from '../../helpers/date-time';
import styles from './card.module.scss';
import ContinueReading from '../continue-reading';

function Card({ title, image, description, url, author, publishedAt, source, direction = 'top', loading, category }) {
  const formatedDate = publishedAt && formatDate(publishedAt, 'DD.MM.YYYY', '/', 'en-GB');

  return (
    <div className={`${styles.card || ''} ${styles[direction] || ''}`}>
      <div className={styles.imgContainer || ''}>
        {loading ? (
            <Skeleton variant='image' />
        ) : (
            <LazyImage src={image ? image : 'https://placehold.co/100010400?text=News'} alt={title} />
        )}
      </div>
      <div className={styles.textContainer || ''}>
        <div className={styles.cardBody || ''}>
          {loading ? (
            <>
                <Skeleton width="100px" height="20px" />
                <Skeleton height="38px" variant='heading' />
                <Skeleton height="20px" variant='paragraph' /> 
                <Skeleton height="20px" variant='paragraph' />
                <Skeleton height="20px" variant='paragraph' />
                <Skeleton width="100px" height="15px" />
            </>
          ) : (
            <>            
              <label>{source.name}</label>
              <h3>{title}</h3>
              <p className={styles.description || ''}>{description}</p>
              <ContinueReading url={url} />
            </>
          )}
        </div>
        <div className={styles.cardFooter || ''}>
          {loading ? (
            <>
              <Skeleton width="100px" height="15px" />
              <Skeleton width="100px" height="15px" />
            </>
          ) : (
            <>
              {author && <Author authorName={author} />}
              <span>{formatedDate}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  publishedAt: PropTypes.string,
  source: PropTypes.shape({
    name: PropTypes.string,
  }),
}

export default Card;