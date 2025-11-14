import React from "react";

const App: React.FC = () => {
  return (
    <main className="popup">
      <header>
        <h1>CART</h1>
        <p>Amazon cart exporter scaffold.</p>
      </header>
      <section>
        <button type="button">Export Data to CSV</button>
        <p>Cart data will appear here once the build pipeline is configured.</p>
      </section>
    </main>
  );
};

export default App;
