import styles from '../styles/ProductCard.module.css';

function ProductCard({ product, onEdit, onDelete }) {
    return (
      <div className={styles.card}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${product.image})` }}
        >
        </div>
        <div className={styles.info}>
          <h3>{product.name}</h3>
          <p>Valor: R$ {product.price}</p>
          <button onClick={() => onEdit(product)}>Editar</button>
          <button onClick={() => onDelete(product.id)}>Excluir</button>
        </div>
      </div>
    );
  }
  
  export default ProductCard;
