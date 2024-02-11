import React from 'react';
import styles from '../styles/Footer.module.css'; // Certifique-se de atualizar com o caminho correto para o seu arquivo CSS

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>Jonatha Fabricio - CRUD</p>
      </div>
    </footer>
  );
};

export default Footer;
