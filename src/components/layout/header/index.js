import { Link } from 'react-router-dom';
import Filters from '../../filters';
import Search from '../../search';
import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header || ''}>
      <div className={styles.container || ''}>
        <Filters />
        <Link to='/'>
          NewsFirst
        </Link>
        <Search />
      </div>
    </header>
  );
}

export default Header;