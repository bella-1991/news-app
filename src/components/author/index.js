import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import LazyImage from '../../hooks/lazy-image';
import verifyIcon from '../../images/verify.svg'
import styles from './author.module.scss';

const Author = ({
  label = 'By',
  authorName,
  authorPath,
  showLinks = false,
  verify = verifyIcon,
}) => {
  const author = authorName?.split(/\s+/);

  return (
    <div className={styles.author}>
      {showLinks ? (
        <Link to={authorPath}>
          {`${label} ${`${author[0]} ${author[1]?.slice(0, 1)}.`}`}
          <LazyImage src='../../' alt="verify" width={14} height={14} />
        </Link>
      ) : (
        <>
            {`${label} ${`${author[0]} ${author[1]?.slice(0, 1)}.`}`}
            <LazyImage src={verify} alt="verify" width={14} height={14} />
        </>
      )}
    </div>
  )
};

Author.propTypes = {
  label: PropTypes.string,
  authorName: PropTypes.string,
  authorPath: PropTypes.string,
  verify: PropTypes.string,
  showLinks: PropTypes.bool,
};

export default Author;