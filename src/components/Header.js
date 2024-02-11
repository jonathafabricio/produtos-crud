import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>C R U D</div>
      <nav className={styles.navigation}>
        {/* <ul>
          <li>
            <a href="/#">MEUS PRODUTOS</a>
          </li>
          <li>
            <a href="/#">ADICIONAR PRODUTO</a>
          </li>
        </ul> */}
      </nav>
    </header>
  );
};

export default Header;
