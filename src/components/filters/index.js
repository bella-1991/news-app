import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import { IoIosMenu } from '@react-icons/all-files/io/IoIosMenu';
import Button from '../button';
import { toggleFilters } from '../../features/news/newsSlice';
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
      <Button 
        noStyle 
        onClick={() => dispatch(toggleFilters(true))} 
        icon={<IoIosMenu size={32} />} 
      />
      <div 
        onClick={(e) => handleOverlayClickClose(e)}
        tabIndex={0}
        role="button"
        aria-label="Close filters"
        className={`${styles.filtersContainer || ''} ${filtersOpen ? styles.show || '' : ''}`}>
        <div className={styles.filtersContent}>
          <div className={styles.filtersHeader}>
            Filters       
            <Button 
              noStyle 
              onClick={() => dispatch(toggleFilters(false))} 
              icon={<IoMdClose />} 
            />  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;