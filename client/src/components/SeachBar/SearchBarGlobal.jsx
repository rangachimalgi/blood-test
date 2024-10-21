import { useState } from "react";
import { products } from "../../utils/products";
import { healthPackagesArray } from "../../pages/HealthPackages";
import { useNavigate } from "react-router-dom";
import "./searchbarglobal.css";

const ProductSearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    const filteredProducts = products
      .filter((item) =>
        item.productName
          ? item.productName.toLowerCase().includes(searchTerm)
          : false
      )
      .map((item) => ({ ...item, type: "product" })); // Add type property

      console.log("Filtered Products:", filteredProducts);

    const filteredPackages = healthPackagesArray
      .filter((item) =>
        item.productName
          ? item.productName.toLowerCase().includes(searchTerm)
          : false
      )
      .map((item) => ({ ...item, type: "package" })); // Add type property

    const combinedResults = [...filteredProducts, ...filteredPackages];
    setSearchResults(combinedResults);
  };

  const handleChange = (input) => {
    const newValue = input.target.value;
    setInputValue(newValue);
    handleSearch(newValue.toLowerCase());
  };

  const navigate = useNavigate();

  const handleProductClick = (item) => {
    if (item.type === "package") {
      navigate(`/health/${item.id}`);
    } else if (item.type === "product") {
      navigate(`/shop/${item.id}`);
    }

    setInputValue("");
    setSearchResults([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
      />
      <div className="search-dropdown">
        {inputValue &&
          searchResults.map((item) => (
            <div key={item.id} onClick={() => handleProductClick(item)}>
              {item.productName || item.packageName}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductSearchBar;
