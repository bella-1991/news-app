import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../button';
import { Navigation as nav, API as api } from '../../../constants'
import { fetchCategoryNews, changeCategory } from '../../../features/news/newsSlice';
import styles from './anchor.module.scss';

function Anchor() {
    const state = useSelector((state) => state.news);
    const { category } = state || {};
    const dispatch = useDispatch();

    const handleCategoryChange = (label) => {
        dispatch(changeCategory(label));
        dispatch(fetchCategoryNews(api.GNEWS));
    }
    
    return ( 
        <div className={styles.menu}>
            <div className={`${styles.container} ${styles.menuContainer}`}>
                <ul className={styles.nav}>
                    {nav.map(item => (
                        <li 
                            key={item.label}
                            className={`${styles.item || ''} ${category === item.label ? styles.active || '' : ''}`}
                        >                                
                            <Button 
                                noStyle 
                                onClick={() => handleCategoryChange(item.label)} 
                                btnText={item.text}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
     );
}

export default Anchor;