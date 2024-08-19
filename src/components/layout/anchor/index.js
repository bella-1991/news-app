import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation as nav } from '../../../constants'
import styles from './anchor.module.scss';

function Anchor() {
    const state = useSelector((state) => state.news);
    const { searchTerm } = state || {};
    
    return ( 
        <div className={styles.menu}>
            <div className={`${styles.container} ${styles.menuContainer}`}>
                <ul className={styles.nav}>
                    {nav.map(item => (
                        <li 
                            key={item.label}
                            className={`${styles.item || ''} ${searchTerm === item.label ? styles.active || '' : ''}`}
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
     );
}

export default Anchor;