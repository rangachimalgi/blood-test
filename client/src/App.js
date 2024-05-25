import { useState, createContext, useEffect, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataComponent from "./components/DataComponent";
import AdminPanel from "./components/AdminPanel";
import ViewOrders from "./components/ViewOrders";
import ViewUsers from "./components/ViewUsers";
import TotalRevenue from "./components/TotalRevenue";
import UserDashboard from "./components/UserDashboard";
import { products } from "./utils/products";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Health = lazy(() => import("./pages/HealthPackagesDetails"));
const HealthList = lazy(() => import("./pages/HealthPackageList"));

const Cart = lazy(() => import("./pages/Cart"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"))
export const DataContainer = createContext();
function App() {
  const [CartItem, setCartItem] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterList, setFilterList] = useState([]);

  const addToCart = (product, num = 1) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + num }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: num }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    // If product quantity == 1 then we have to remove it
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    }
    //else we just decrease the quantity
    else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  const [globalFilterList, setGlobalFilterList] = useState(products); // This will be your global list

  const deleteProduct = (product) => {
    setCartItem(CartItem.filter((item) => item.id !== product.id));
  };
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(CartItem));
  }, [CartItem]);
  return (
    <DataContainer.Provider
      value={{
        CartItem,
        setCartItem,
        addToCart,
        decreaseQty,
        deleteProduct,
        selectedProduct,
        setSelectedProduct,
        globalFilterList,
        setGlobalFilterList,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:id" element={<ProductDetails key={window.location.pathname} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/health-list" element={<HealthList />} />
            <Route path="/health/:id" element={<Health />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route path="/admin/view-orders" element={<ViewOrders />} />
            <Route path="/admin/view-users" element={<ViewUsers />} />
            <Route path="/admin/total-revenue" element={<TotalRevenue />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} /> {/* New Route for Terms and Conditions */}
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    </DataContainer.Provider>
  );
}

export default App;
