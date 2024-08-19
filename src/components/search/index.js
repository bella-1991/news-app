import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSearch, changeSearchTerm } from '../../features/news/newsSlice';
import { BiSearchAlt } from '@react-icons/all-files/bi/BiSearchAlt';
import Button from '../button';
import styles from './search.module.scss';

const Search = () => {
  const state = useSelector(state => state.news);
  const { searchOpen } = state || {};
  const dispatch = useDispatch();

  const [searchVal, setSearchVal] = useState('');
  const searchInputRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    searchOpen && searchInputRef.current.focus();
  }, [searchOpen]);

  const handleSearch = () => {
    dispatch(toggleSearch(false));
    dispatch(changeSearchTerm(searchVal));
    setSearchVal('');
  }

  const handleOverlayClickClose = (event) => {
    if (event.target.classList.contains(styles.searchForm)) {
      dispatch(toggleSearch(false));
      setSearchVal('');
    }
  };

  return (
    <div className={styles.search || ''}>     
      <Button 
        noStyle 
        onClick={() => dispatch(toggleSearch(true))} 
        icon={<BiSearchAlt size={24} />} 
      />

      {searchOpen && (
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
              value={searchVal}
              ref={searchInputRef}
              onChange={e => setSearchVal(e.target.value)}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
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