import React from 'react';
import styles from './footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer || ''}>
      <div className={styles.container || ''}>
        <p className={styles.copyright || ''}>
          {`
            © ${new Date().getFullYear()} 
            NewsFirst. All rights reserved.
          `}
        </p>
      </div>
    </footer>
  );
}

export default Footer