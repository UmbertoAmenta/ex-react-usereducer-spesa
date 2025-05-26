export default function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  return (
    <div className="list">
      {products.map((product) => (
        <div className="product">
          <span>{product.name}</span>
          <span>{product.price}€</span>
        </div>
      ))}
    </div>
  );
}
