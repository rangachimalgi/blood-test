import { useState, createContext, useEffect, useCallback, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from "react-router-dom";
import axios from "axios";
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
import HealthPackagesList from "./pages/HealthPackageList";
import {healthConcerns, products } from "./utils/products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ManagePackages from "./pages/Admin/ManagePackages";
import ManageTests from "./pages/Admin/ManageTests";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Health = lazy(() => import("./pages/HealthPackagesDetails"));
const HealthList = lazy(() => import("./pages/HealthPackageList"));

const Cart = lazy(() => import("./pages/Cart"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));

const HealthPackagesListWrapper = () => {
  const { id } = useParams();

  // Find the selected health concern
  const selectedConcern = healthConcerns.find((concern) => concern.id === id);

  if (!selectedConcern) {
    return <p>Health concern not found.</p>;
  }

  return <HealthPackagesList packageIds={selectedConcern.packageIds} />;
};

export const DataContainer = createContext();

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <div className={`page-content ${isHomePage ? 'home-page' : 'other-page'}`}>
      {children}
    </div>
  );
};

function App() {
  const [CartItem, setCartItem] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterList, setFilterList] = useState([]);
  const [cachedPackages, setCachedPackages] = useState([]);
  const [cachedTests, setCachedTests] = useState([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [testsLoading, setTestsLoading] = useState(false);

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

  // Function to fetch packages with caching - memoized to prevent recreation
  const fetchPackages = useCallback(async () => {
    console.log('🔍 fetchPackages called - cachedPackages.length:', cachedPackages.length);
    
    if (cachedPackages.length > 0) {
      console.log('📦 Using cached packages:', cachedPackages.length);
      return cachedPackages; // Return cached data if available
    }
    
    console.log('🌐 Fetching packages from API...');
    setPackagesLoading(true);
    const startTime = performance.now();
    
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/packages`;
      console.log('🚀 Making request to:', apiUrl);
      
      // Add timeout to prevent hanging requests - increased for mobile
      const res = await axios.get(apiUrl, {
        timeout: 15000 // 15 second timeout for mobile devices
      });
      
      console.log('✅ Packages response received:', res.data?.length || 0, 'items');
      setCachedPackages(res.data);
      setPackagesLoading(false);
      
      const endTime = performance.now();
      console.log(`📊 Packages loaded in ${(endTime - startTime).toFixed(2)}ms`);
      
      return res.data;
    } catch (err) {
      console.error("❌ Failed to fetch packages:", err);
      console.error("Error details:", {
        message: err.message,
        code: err.code,
        response: err.response?.status,
        apiUrl: process.env.REACT_APP_API_URL,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      });
      setPackagesLoading(false);
      return [];
    }
  }, [cachedPackages.length]); // Only depend on the length, not the entire array

  // Function to fetch tests with caching - memoized to prevent recreation
  const fetchTests = useCallback(async () => {
    console.log('🔍 fetchTests called - cachedTests.length:', cachedTests.length);
    
    if (cachedTests.length > 0) {
      console.log('🧪 Using cached tests:', cachedTests.length);
      return cachedTests; // Return cached data if available
    }
    
    console.log('🌐 Fetching tests from API...');
    setTestsLoading(true);
    const startTime = performance.now();
    
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/tests`;
      console.log('🚀 Making request to:', apiUrl);
      
      // Add timeout to prevent hanging requests - increased for mobile
      const res = await axios.get(apiUrl, {
        timeout: 15000 // 15 second timeout for mobile devices
      });
      
      console.log('✅ Tests response received:', res.data?.length || 0, 'items');
      setCachedTests(res.data);
      setTestsLoading(false);
      
      const endTime = performance.now();
      console.log(`📊 Tests loaded in ${(endTime - startTime).toFixed(2)}ms`);
      
      return res.data;
    } catch (err) {
      console.error("❌ Failed to fetch tests:", err);
      console.error("Error details:", {
        message: err.message,
        code: err.code,
        response: err.response?.status,
        apiUrl: process.env.REACT_APP_API_URL,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      });
      setTestsLoading(false);
      return [];
    }
  }, [cachedTests.length]); // Only depend on the length, not the entire array
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(CartItem));
  }, [CartItem]);

  // Preload critical data on app start
  useEffect(() => {
    // Preload packages and tests data in background
    console.log('App starting - preloading data...');
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      currentURL: window.location.href
    });
    fetchPackages();
    fetchTests();
  }, []); // Only run once on app start
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
        cachedPackages,
        cachedTests,
        packagesLoading,
        testsLoading,
        fetchPackages,
        fetchTests,
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
          <PageWrapper>
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/shop/:id"
                  element={<ProductDetails key={window.location.pathname} />}
                />
                <Route path="/shop" element={<Shop />} />
                <Route path="/health-list" element={<HealthList />} />
                <Route path="/health/:id" element={<Health />} />
                <Route
                  path="/health-concern/:id"
                  element={<HealthPackagesListWrapper />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin/*" element={<AdminPanel />} />
                <Route path="/admin/view-orders" element={<ViewOrders />} />
                <Route path="/admin/view-users" element={<ViewUsers />} />
                <Route path="/admin/total-revenue" element={<TotalRevenue />} />
                <Route path="/admin/manage-packages" element={<ManagePackages />} />
                <Route path="/admin/manage-tests" element={<ManageTests />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/refund-policy" element={<RefundPolicy />} />
              </Routes>
            </main>
          </PageWrapper>
          <Footer />
        </Router>
      </Suspense>
    </DataContainer.Provider>
  );
}

export default App;
