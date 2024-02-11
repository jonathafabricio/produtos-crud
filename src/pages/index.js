import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', image: '' });

  useEffect(() => {
    const loadedProducts = loadFromLocalStorage('products');
    if (!loadedProducts || loadedProducts.length === 0) {
      setProducts([
        { id: 1, name: 'Óculos de sol', price: '50.00', image: 'http://source.unsplash.com/random/?glasses&1' },
        { id: 2, name: "Cadeira", price: "50.00", image: "http://source.unsplash.com/random/?chair&1/" },
        { id: 3, name: "Vaso de planta", price: "50.00", image: "http://source.unsplash.com/random/?plant&1/" },
        { id: 4, name: "Quadro de parede", price: "50.00", image: "http://source.unsplash.com/random/?frame&1/" },
        { id: 5, name: "Teclado", price: "50.00", image: "http://source.unsplash.com/random/?computer&1/" },
        { id: 6, name: "Capa de chuva", price: "50.00", image: "http://source.unsplash.com/random/?raincoat&1/" },
        { id: 7, name: "Fantasia", price: "50.00", "image": "http://source.unsplash.com/random/?fantasy&1/" },
      ]);
    } else {
      setProducts(loadedProducts);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage('products', products);
  }, [products]);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const startAddProduct = () => {
    setAddingProduct(true);
    setForm({ name: '', price: '', image: '' });
  };

  const handleSaveNewProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, name: form.name, price: form.price, image: form.image };
    setProducts([...products, newProduct]);
    setAddingProduct(false);
  };

  const cancelAddProduct = () => {
    setAddingProduct(false);
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setForm({ name: product.name, price: product.price, image: product.image });
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((product) => {
      if (product.id === currentProduct.id) {
        return { ...form, id: product.id };
      }
      return product;
    });
    setProducts(updatedProducts);
    setIsEditing(false);
    setCurrentProduct(null);
    setForm({ name: '', price: '', image: '' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setForm({ name: '', price: '', image: '' });
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => handleEditProduct(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
        {addingProduct && (
          <div className={styles.inputNewProduct}>
            <input
              type="text"
              placeholder="Nome do Produto"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Preço"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL da Imagem"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <button onClick={handleSaveNewProduct}>Salvar Novo Produto</button>
            <button onClick={cancelAddProduct}>Cancelar</button>
          </div>
        )}
        <div className={styles.addProductCard} onClick={startAddProduct}>
          <div className={styles.addProductContent}>+</div>
        </div>
        {isEditing && (
          <Modal title="Editar Produto" onClose={handleCancel}>
            <input
              type="text"
              placeholder="Nome do Produto"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Preço"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL da Imagem"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <button onClick={handleUpdateProduct}>Atualizar Produto</button>
            <button onClick={handleCancel}>Cancelar</button>
          </Modal>
        )}
      </main>
      <Footer />
    </div>
  );
}
