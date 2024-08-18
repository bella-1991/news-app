import styles from './anchor.module.scss';
import { Navigation as nav } from '../../../constants'
import { useState } from 'react';

function Anchor() {
    const [active, setActive] = useState('world');
    
    return ( 
        <div className={styles.menu}>
            <div className={`${styles.container} ${styles.menuContainer}`}>
                <ul className={styles.nav}>
                    {nav.map(item => (
                        <li 
                            key={item.label}
                            className={`${styles.item || ''} ${active === item.label ? styles.active || '' : ''}`}
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