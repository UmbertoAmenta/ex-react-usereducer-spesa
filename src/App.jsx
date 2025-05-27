import { useState } from "react";

export default function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    if (!addedProducts.some((p) => p.name === product.name)) {
      return setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
    return addedProducts;
  };

  return (
    <>
      <h3>I nostri prodotti..</h3>
      <div className="list">
        {products.map((product, i) => (
          <div className="product" key={i}>
            <span className="info">
              <span>{product.name}</span>
              <span>{product.price}€</span>
            </span>
            <span>
              <button onClick={() => addToCart(product)}>
                Aggiungi al carrello
              </button>
            </span>
          </div>
        ))}
      </div>
      {addedProducts.length != 0 && (
        <>
          <h3>..il tuo carrello</h3>
          <div className="cart">
            {addedProducts.map((product, i) => (
              <div className="product" key={i}>
                <span className="info">
                  <span>{product.name}</span>
                  <span>{product.price}€</span>
                  <span>x {product.quantity}</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
