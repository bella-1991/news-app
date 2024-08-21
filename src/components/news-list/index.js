import PropTypes from 'prop-types';
import Card from '../card';
import styles from './news-list.module.scss'

function NewsList({ articles, searchTerm, direction, featured, loading, length, error }) {

  
  return (
    <div className={styles.newsList}>
      <h2 className={styles.title}>{`${searchTerm} News`}</h2>
      {(!loading && !articles?.length) && (
        <div>
          Could not load Articles. Please try again later.
          {error && ` ${error}`}
        </div>
      )}
      <div className={`${styles.posts} ${featured ? styles.featured || '' : styles.grid || ''}`}>
        {loading ? (
          [...Array(length)].map((item, index) => (
            <Card 
              key={index}
              loading={loading}
              direction={direction}
              />
          ))
        ) : (
          articles?.map((article) => {
            const { url, title, urlToImage, description, author, source, publishedAt, image, category } = article || {};
  
            if (title.includes('Removed')) return null;
  
            return (
              <Card 
                key={url}
                title={title}
                image={urlToImage || image}
                url={url}
                description={description}
                author={author}
                source={source}
                publishedAt={publishedAt}
                direction={direction}
                category={category}
              />
          )})
        )}
      </div>
    </div>
  );
}

NewsList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})),
}

export default NewsList;