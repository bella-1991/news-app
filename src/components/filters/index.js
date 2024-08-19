import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilters } from '../../features/news/newsSlice';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import { IoIosMenu } from '@react-icons/all-files/io/IoIosMenu';
import styles from './filters.module.scss';

function Filters() {
  const filtersOpen = useSelector(state => state.news.filtersOpen);
  const dispatch = useDispatch();

  const handleOverlayClickClose = (event) => {
    if (event.target.classList.contains(styles.filtersContainer)) {
      dispatch(toggleFilters(false));
    }
  };

  return ( 
    <div className={styles.filters || ''}>      
      <button onClick={() => dispatch(toggleFilters(true))}>
        <IoIosMenu size={32} />
      </button>
      <div 
        onClick={(e) => handleOverlayClickClose(e)}
        tabIndex={0}
        role="button"
        aria-label="Close filters"
        className={`${styles.filtersContainer || ''} ${filtersOpen ? styles.show || '' : ''}`}>
        <div className={styles.filtersContent}>
          <div className={styles.filtersHeader}>
            Filters     
            <button onClick={() => dispatch(toggleFilters(false))}>
              <IoMdClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;