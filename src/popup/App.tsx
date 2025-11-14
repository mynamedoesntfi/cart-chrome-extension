import React from "react";
import "./App.css";
import CartList from "./components/CartList";

const App: React.FC = () => {
  return (
    <main className="popup">
      <header>
        <h1>CART</h1>
        <p>Amazon cart exporter scaffold.</p>
      </header>
      <section className="popup__actions">
        <button type="button">Export Data to CSV</button>
        <p>Cart data will appear here once the build pipeline is configured.</p>
      </section>

      <CartList />
    </main>
  );
};

export default App;
