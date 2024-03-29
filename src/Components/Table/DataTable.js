
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./DataTable.css";

const DataTable = ({ data, selectedProducts, onCheckboxChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
  
    setFilteredData(data);
  }, [data]);

  const handleCheckboxChange = (event, id) => {
    onCheckboxChange(event, id);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filteredProducts = data.filter((product) =>
      Object.values(product)
        .map((value) => String(value).toLowerCase())
        .some((value) => value.includes(lowerCaseSearch))
    );
    setFilteredData(filteredProducts);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex;
  let visibleData;
  if (currentPage === totalPages) {
    endIndex = filteredData.length;
    visibleData = filteredData.slice(startIndex, endIndex);
  } else {
    endIndex = startIndex + itemsPerPage;
    visibleData = filteredData.slice(startIndex, endIndex);
  }

  return (
    <div className="data-table">
      <h3>Products Data Table</h3>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => handleCheckboxChange(e, product.id)}
                />
              </td>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span>{`${startIndex + 1}-${endIndex} of ${
          filteredData.length
        } `}</span>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
