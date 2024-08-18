import PropTypes from 'prop-types';
import LazyImage from '../../hooks/lazy-image';
import Author from '../author';
import { formatDate } from '../../helpers/date-time';
import styles from './card.module.scss';
import ContinueReading from '../continue-reading';

function Card({ id, title, image, description, url, author, publishedAt, source, direction = 'top' }) {
  const formatedDate = publishedAt && formatDate(publishedAt, 'DD.MM.YYYY', '/', 'en-GB');

  return (
    <div className={`${styles.card || ''} ${styles[direction] || ''}`}>
      <div className={styles.imgContainer || ''}>
        <LazyImage src={image ? image : 'https://placehold.co/100010400?text=News'} alt={title} />
      </div>
      <div className={styles.textContainer || ''}>
        <div className={styles.cardBody || ''}>
            <label>{source.name}</label>
            <h3>{title}</h3>
            <p className={styles.description || ''}>{description}</p>
            <ContinueReading url={url} />
        </div>
        <div className={styles.cardFooter || ''}>
            {author && <Author authorName={author} />}
            <span>{formatedDate}</span>
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