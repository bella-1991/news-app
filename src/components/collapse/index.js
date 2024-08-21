import { useState } from 'react';
import styles from './collapse.module.scss';

function Collapse({
    btnText,
    icon = null,
    content,
    open = true,
}) {
    const [show, setShow] = useState(open);

    return ( 
        <div className={`${styles.collapseContainer || ''} ${show ? styles.show || '' : ''}`}>
            <div 
                role='button'
                aria-label='collapse/expand button'
                onClick={() => setShow(!show)}
                className={styles.button || ''}
            >
                {btnText}
                {icon ? icon : <span className={styles.buttonIcon}></span>}
            </div>
            {show && (
                <div className={styles.collapseContent || ''}>
                    {content}
                </div>
            )}
        </div>
     );
}

export default Collapse;