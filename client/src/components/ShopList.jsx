import { Row, Pagination } from "react-bootstrap";
import { useEffect, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product/Product";
import { DataContainer } from "../App";
import "../Styles/Shop.css";

const ShopList = ({ productItems }) => {
  const { addToCart } = useContext(DataContainer);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllItems, setShowAllItems] = useState(false);
  const itemsPerPage = 20; // Show 20 items per page

  useEffect(() => {
    console.log('ShopList: productItems updated:', productItems?.length || 0, 'items');
    // Reset to first page when productItems change
    setCurrentPage(1);
  }, [productItems]);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Removed toast notification
  };

  // Calculate pagination
  const paginatedData = useMemo(() => {
    if (!productItems || productItems.length === 0) return [];
    
    // If showAllItems is true, return all items (with performance warning)
    if (showAllItems) {
      console.warn('Showing all items - this may impact performance on mobile devices');
      return productItems;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productItems.slice(startIndex, endIndex);
  }, [productItems, currentPage, itemsPerPage, showAllItems]);

  const totalPages = Math.ceil((productItems?.length || 0) / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!productItems || productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  }

  return (
    <div>
      {/* Show total count and current page info */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          {showAllItems ? (
            `Showing all ${productItems.length} tests`
          ) : (
            `Showing ${((currentPage - 1) * itemsPerPage) + 1} to ${Math.min(currentPage * itemsPerPage, productItems.length)} of ${productItems.length} tests`
          )}
        </p>
        <div className="d-flex align-items-center gap-3">
          {!showAllItems && (
            <p className="text-muted mb-0">
              Page {currentPage} of {totalPages}
            </p>
          )}
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setShowAllItems(!showAllItems)}
          >
            {showAllItems ? 'Show Paginated' : 'Show All Tests'}
          </button>
        </div>
      </div>

      <Row className="justify-content-center shop-list-grid">
        {paginatedData.map((productItem, idx) => {
          // Validate productItem
          if (!productItem || !productItem.productName) {
            console.warn(`Invalid product item at index ${idx}:`, productItem);
            return null;
          }

          // Create a more stable key
          const stableKey = productItem.id ? `test-${productItem.id}` : `shop-item-${idx}-${productItem.productName?.replace(/\s+/g, '-')}`;
          
          return (
            <div 
              className="shop-list-simple-row" 
              key={stableKey} 
              style={{ animationDelay: `${(idx % 6) * 0.12}s` }}
            >
              <div
                className="shop-list-simple-name"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${productItem.productName}`}
                onClick={() => navigate(`/shop/${productItem.id}`)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/shop/${productItem.id}`);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                {productItem.productName}
              </div>
              <div className="shop-list-simple-price">₹{productItem.price}</div>
              <div className="shop-list-simple-buttons">
                <button
                  className="shop-list-book-button"
                  aria-label="Book Now"
                  onClick={() => navigate(`/shop/${productItem.id}`)}
                >
                  Book Now
                </button>
                <button
                  className="shop-list-add-to-cart-button"
                  aria-label="Add to Cart"
                  onClick={() => handleAddToCart(productItem)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </Row>

      {/* Pagination - only show when not showing all items */}
      {!showAllItems && totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First 
              onClick={() => handlePageChange(1)} 
              disabled={currentPage === 1}
            />
            <Pagination.Prev 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            />
            
            {/* Show page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and pages around current page
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                );
              } else if (
                page === currentPage - 3 || 
                page === currentPage + 3
              ) {
                return <Pagination.Ellipsis key={page} />;
              }
              return null;
            })}
            
            <Pagination.Next 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            />
            <Pagination.Last 
              onClick={() => handlePageChange(totalPages)} 
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

    </div>
  );
};

export default ShopList;
