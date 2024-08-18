import PropTypes from 'prop-types';
import Card from '../card';
import styles from './news-list.module.scss'

function NewsList({ articles, searchTerm, direction, featured }) {
  return (
    <div className={styles.newsList}>
      <h2 className={styles.title}>{`${searchTerm} News`}</h2>
      <div className={`${styles.posts} ${featured ? styles.featured || '' : styles.grid || ''}`}>
        {articles.map((article) => {
          const { id, url, title, urlToImage, description, author, source, publishedAt, image } = article || {};

          if (title.includes('Removed')) return null;

          return (
            <Card 
              key={url}
              id={id || url}
              title={title}
              image={urlToImage || image}
              url={url}
              description={description}
              author={author}
              source={source}
              publishedAt={publishedAt}
              direction={direction}
            />
        )})}
      </div>
    </div>
  );
}

NewsList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})),
}

export default NewsList;