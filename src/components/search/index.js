import React, { useState, useRef } from 'react';
import { BiSearchAlt } from '@react-icons/all-files/bi/BiSearchAlt';
import Button from '../button';
import styles from './search.module.scss';

const Search = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const searchRef = useRef(null);

  const handleSearch = () => {
    console.log(searchTerm);
    setOpen(false);
    setSearchTerm(null);
  }

  const handleOverlayClickClose = (event) => {
    if (event.target.classList.contains(styles.searchForm)) {
      setOpen(false);
    }
  };

  return (
    <div className={styles.search || ''}>
      <button onClick={() => setOpen(true)}>
        <BiSearchAlt size={24} />
      </button>

      {open && (
        <div
          onClick={(e) => handleOverlayClickClose(e)}
          tabIndex={0}
          role="button"
          aria-label="Close search"
          className={`${styles.searchForm || ''} ${styles.show || ''}`}
        >
          <div className={styles.form || ''}>
            <input
              type="text"
              placeholder='Keyword...'
              className={styles.formInput || ''}
              maxLength="60"
              ref={searchRef}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleSearch(event);
                }
              }}
            />
            <Button 
              btnText="Search"
              onClick={() => handleSearch()}
              />
          </div>
        </div>
      )}
    </div>
  );
};

Search.propTypes = {};

export default Search;