import { useState, useCallback, useRef } from "react";
import "./searchbar.css";
// import { products } from "../../utils/products";

const SearchBar = ({ allProducts = [], setFilterList }) => {
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef(null);

  const handleChange = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    setIsSearching(true);

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set new timeout for search
    searchTimeout.current = setTimeout(() => {
      const filtered = allProducts.filter((item) =>
        item.productName?.toLowerCase().includes(value)
      );
      setFilterList(filtered);
      setIsSearching(false);
    }, 300); // 300ms debounce
  }, [allProducts, setFilterList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = allProducts.filter((item) =>
      item.productName?.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilterList(filtered);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        placeholder="Search tests and packages..."
        value={inputValue}
        onChange={handleChange}
        aria-label="Search tests and packages"
      />
      <button type="submit" className="search-button" aria-label="Search">
        <ion-icon 
          name={isSearching ? "reload-outline" : "search-outline"} 
          class={`search-icon ${isSearching ? 'searching' : ''}`}
        ></ion-icon>
      </button>
    </form>
  );
};

export default SearchBar;