import { useState, useEffect } from "react";
import axios from "axios";
import { products } from "../../utils/products";
import { healthPackagesArray } from "../../pages/HealthPackages";
import { useNavigate } from "react-router-dom";
import "./searchbarglobal.css";

const ProductSearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Fetch dynamic data from API
        const [testsResponse, packagesResponse] = await Promise.allSettled([
          axios.get(`${process.env.REACT_APP_API_URL}/api/tests`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/packages`)
        ]);

        // Combine static and dynamic data
        const staticProducts = products || [];
        const dynamicProducts = testsResponse.status === 'fulfilled' ? testsResponse.value.data : [];
        const combinedProducts = [...staticProducts, ...dynamicProducts];

        const staticPackages = healthPackagesArray || [];
        const dynamicPackages = packagesResponse.status === 'fulfilled' ? packagesResponse.value.data : [];
        const combinedPackages = [...staticPackages, ...dynamicPackages];



        setAllProducts(combinedProducts);
        setAllPackages(combinedPackages);
      } catch (error) {
        console.error("Error fetching data for search:", error);
        // Fallback to static data only
        setAllProducts(products || []);
        setAllPackages(healthPackagesArray || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();

    // Cleanup function to clear timeout on unmount
    return () => {
      if (window.searchTimeout) {
        clearTimeout(window.searchTimeout);
      }
    };
  }, []);

  const searchInText = (text, searchTerm) => {
    if (!text || !searchTerm) return false;
    const textLower = text.toString().toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return textLower.includes(searchLower);
  };

  const searchInArray = (array, searchTerm) => {
    if (!array || !Array.isArray(array)) return false;
    return array.some(item => searchInText(item, searchTerm));
  };

  const searchInObject = (obj, searchTerm) => {
    if (!obj || typeof obj !== 'object') return false;
    
    // Search in common fields
    const commonFields = ['productName', 'name', 'title', 'description', 'desc', 'shortDesc'];
    for (const field of commonFields) {
      if (searchInText(obj[field], searchTerm)) return true;
    }

    // Search in included tests for packages
    if (obj.includedTests && Array.isArray(obj.includedTests)) {
      for (const testCategory of obj.includedTests) {
        if (searchInText(testCategory.categoryName, searchTerm)) return true;
        if (searchInArray(testCategory.tests, searchTerm)) return true;
      }
    }

    // Search in category
    if (searchInText(obj.category, searchTerm)) return true;

    return false;
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const term = searchTerm.trim();

    // Search in products
    const filteredProducts = allProducts
      .filter((item) => searchInObject(item, term))
      .map((item) => ({ ...item, type: "product" }));

    // Search in packages
    const filteredPackages = allPackages
      .filter((item) => searchInObject(item, term))
      .map((item) => ({ ...item, type: "package" }));

    // Combine and limit results
    const combinedResults = [...filteredProducts, ...filteredPackages].slice(0, 10);
    setSearchResults(combinedResults);
  };

  const handleChange = (input) => {
    const newValue = input.target.value;
    setInputValue(newValue);
    
    // Clear any existing timeout
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    
    // Debounce search
    window.searchTimeout = setTimeout(() => {
      handleSearch(newValue);
    }, 300);
  };

  const handleProductClick = (item) => {
    if (item.type === "package") {
      navigate(`/health/${item.id}`);
    } else if (item.type === "product") {
      navigate(`/shop/${item.id}`);
    }

    setInputValue("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const getDisplayName = (item) => {
    return item.productName || item.name || item.title || "Unknown Item";
  };

  const getDisplayType = (item) => {
    return item.type === "package" ? "Package" : "Test";
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tests and packages..."
        value={inputValue}
        onChange={handleChange}
        disabled={isLoading}
      />
      {isLoading && (
        <div className="search-loading">
          <ion-icon name="reload-outline" class="search-icon loading"></ion-icon>
        </div>
      )}
      <div className="search-dropdown">
        {inputValue && hasSearched && (
          <>
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <div 
                  key={`${item.type}-${item.id}`} 
                  className="search-result-item"
                  onClick={() => handleProductClick(item)}
                >
                  <div className="search-result-name">{getDisplayName(item)}</div>
                  <div className="search-result-type">{getDisplayType(item)}</div>
                </div>
              ))
            ) : (
              <div className="search-no-results">
                No results found for "{inputValue}"
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSearchBar;
