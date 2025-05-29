import { useState } from "react";
import "./searchbar.css";
// import { products } from "../../utils/products";
const SearchBar = ({ allProducts = [], setFilterList }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    const filtered = allProducts.filter((item) =>
      item.productName?.toLowerCase().includes(value)
    );
    setFilterList(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />
      <ion-icon name="search-outline" class="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;