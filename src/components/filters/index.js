import React, { useState } from 'react';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import { IoIosMenu } from '@react-icons/all-files/io/IoIosMenu';
import styles from './filters.module.scss';

function Filters() {
  const [openFilters, setOpenFilters] = useState(false);

  const handleOverlayClickClose = (event) => {
    if (event.target.classList.contains(styles.filtersContainer)) {
      setOpenFilters(false);
    }
  };

  return ( 
    <div className={styles.filters || ''}>      
      <button onClick={() => setOpenFilters(true)}>
        <IoIosMenu size={32} />
      </button>
      <div 
        onClick={(e) => handleOverlayClickClose(e)}
        tabIndex={0}
        role="button"
        aria-label="Close filters"
        className={`${styles.filtersContainer || ''} ${openFilters ? styles.show || '' : ''}`}>
        <div className={styles.filtersContent}>
          <div className={styles.filtersHeader}>
            Filters     
            <button onClick={() => setOpenFilters(false)}>
              <IoMdClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;