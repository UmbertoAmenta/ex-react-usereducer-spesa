import { useState } from "react";

export default function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const updateProductQuantity = (product) => {
    setAddedProducts((addedProducts) =>
      addedProducts.map((newProduct) =>
        newProduct.name === product.name
          ? { ...newProduct, quantity: newProduct.quantity + 1 }
          : newProduct
      )
    );
  };

  const addToCart = (product) => {
    if (!addedProducts.some((p) => p.name === product.name)) {
      return setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
    return updateProductQuantity(product);
  };

  const removeFromCart = (product) => {
    const newCart = addedProducts.filter((p) => p.name !== product.name);
    return setAddedProducts(newCart);
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
                <span>
                  <button onClick={() => removeFromCart(product)}>
                    Rimuovi dal carrello
                  </button>
                </span>
              </div>
            ))}
          </div>
          <div>
            Totale da pagare:{" "}
            {addedProducts
              .reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              )
              .toFixed(2)}
            €
          </div>
        </>
      )}
    </>
  );
}
