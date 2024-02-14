// src/App.js
import React, { useState, useEffect } from "react";
import DataTable from "./Components/Table/DataTable";
import BarChart from "./Components/Chart/BarChart";
import "./App.css";

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch initial data
    // Replace the URL with your backend service URL
    fetch(`https://dummyjson.com/products?limit=0`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.products);
        const initialSelectedProducts = data.products
          .slice(0, 5)
          .map((row) => row.id);
        setSelectedProducts(initialSelectedProducts);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;

    if (isChecked || selectedProducts.length >= 4) {
      const updatedSelectedProducts = isChecked
        ? [...selectedProducts, id]
        : selectedProducts.filter((selectedId) => selectedId !== id);

      setSelectedProducts(updatedSelectedProducts);
    }
  };

  return (
    <div className="app">
      <div className="container">
        {!loading && (
          <>
            <DataTable
              data={data}
              selectedProducts={selectedProducts}
              onCheckboxChange={handleCheckboxChange}
            />
            <BarChart data={data} selectedProducts={selectedProducts} />
          </>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
