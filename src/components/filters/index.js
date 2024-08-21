import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import { IoIosMenu } from '@react-icons/all-files/io/IoIosMenu';
import Button from '../button';
import { toggleFilters, handleFiltersChange } from '../../features/news/newsSlice';
import Form from '../form';
import styles from './filters.module.scss';

function Filters() {
  const state = useSelector(state => state.news);
  const { filtersOpen, filters, filterOptions } = state || {};
  const [stateFilters, setStateFilters] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setStateFilters(filters);
  }, [dispatch, filters]);

  console.log(stateFilters);

  const handleChange = (name, value) => {
    // console.log(name);
    // console.log(value);
    setStateFilters({ ...stateFilters, [name]: value === 'all' ? '' : value });
  };

  const handleOverlayClickClose = (event) => {
    if (event.target.classList.contains(styles.filtersContainer)) {
      dispatch(toggleFilters(false));
      setStateFilters(filters);
    }
  };

  const handleFilters = () => {
    dispatch(handleFiltersChange(stateFilters));
  }

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
        <div className={styles.filtersContent || ''}>
          <div className={styles.filtersHeader || ''}>
            <h4>Filters</h4>
            <Button 
              noStyle 
              onClick={() => dispatch(toggleFilters(false))} 
              icon={<IoMdClose />} 
            />  
          </div>
          <div className={styles.filtersBody || ''}>
            {Object.entries(filterOptions).map(([key, item]) => {
                return (
                  <div key={key} className={styles.section}>
                    <Form field={item} handleChange={handleChange} stateFilters={stateFilters} defaults={filters} />           
                  </div>
                )
            })}
          </div>
          <Button 
            className={styles.filtersFooter || ''}
            btnText="Apply Filters"
            onClick={() => handleFilters()}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;