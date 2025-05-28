import { useState, useReducer } from "react";

export default function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [cart, dispatchCart] = useReducer(cartReducer, []);

  function cartReducer(currCart, action) {
    switch (action.type) {
      case "ADD_PRODUCT": {
        const isOnCart = currCart.find(
          (newProduct) => newProduct.name === action.payload.product.name
        );
        if (isOnCart) {
          return currCart.map((newProduct) =>
            newProduct.name === action.payload.product.name
              ? { ...newProduct, quantity: newProduct.quantity + 1 }
              : newProduct
          );
        }
        return [...currCart, { ...action.payload.product, quantity: 1 }];
      }
      case "UPDATE_QUANTITY": {
        let quantity = Math.floor(action.payload.quantity);
        if (quantity < 1 || isNaN(quantity)) quantity = 1;
        return currCart.map((newProduct) =>
          newProduct.name === action.payload.product.name
            ? { ...newProduct, quantity }
            : newProduct
        );
      }
      case "REMOVE_PRODUCT": {
        return currCart.filter(
          (newProduct) => newProduct.name !== action.payload.product.name
        );
      }
      default:
        return currCart;
    }
  }

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
              <button
                onClick={() =>
                  dispatchCart({ type: "ADD_PRODUCT", payload: { product } })
                }
              >
                Aggiungi al carrello
              </button>
            </span>
          </div>
        ))}
      </div>
      {cart.length != 0 && (
        <>
          <h3>..il tuo carrello</h3>
          <div className="cart">
            {cart.map((product, i) => (
              <div className="product" key={i}>
                <span className="info">
                  <span>{product.name}</span>
                  <span>{product.price}€</span>
                  <span>
                    <input
                      type="number"
                      min={1}
                      value={product.quantity}
                      onChange={(e) =>
                        dispatchCart({
                          type: "UPDATE_QUANTITY",
                          payload: { product, quantity: e.target.value },
                        })
                      }
                      onBlur={(e) => {
                        if (!e.target.value || e.target.value < 1) {
                          dispatchCart({
                            type: "UPDATE_QUANTITY",
                            payload: { product, quantity: 1 },
                          });
                        }
                      }}
                    />
                  </span>
                </span>
                <span>
                  <button
                    onClick={() =>
                      dispatchCart({
                        type: "REMOVE_PRODUCT",
                        payload: { product },
                      })
                    }
                  >
                    Rimuovi dal carrello
                  </button>
                </span>
              </div>
            ))}
          </div>
          <div>
            Totale da pagare:{" "}
            {cart
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
