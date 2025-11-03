# 🎯 Practical/Intermediate Interview Questions - React/MERN

## ⚠️ NOT TOO BASIC - REAL INTERVIEW SCENARIOS

---

## 🔴 REDUX - PRACTICAL QUESTIONS

### Q1: **"You have a cart with items. Show me how you'd implement adding an item using Redux."**

**Expected Answer:**
```javascript
// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      
      state.total = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
    }
  }
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
```

```javascript
// Component usage
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './store/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const handleAddToCart = () => {
    dispatch(addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price,
      quantity: 1 
    }));
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <p>Cart Total: ₹{total}</p>
    </div>
  );
}
```

**Key Points:**
- Show understanding of finding existing items
- Calculate total dynamically
- Use Redux Toolkit (modern approach)
- Handle quantity properly

---

### Q2: **"How would you handle async operations in Redux? Like fetching products from an API?"**

**Expected Answer:**
```javascript
// Using createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('/api/products');
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
```

```javascript
// Component usage
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './store/productsSlice';

function ProductList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Key Points:**
- Use `createAsyncThunk` for async operations
- Handle loading, success, and error states
- Show understanding of `extraReducers`

---

### Q3: **"What are Redux middleware? When would you use them? Give an example."**

**Expected Answer:**
"Middleware in Redux allows you to intercept actions before they reach the reducer. Common use cases:

1. **Redux Thunk** - For async operations (I mentioned createAsyncThunk above which uses thunk)
2. **Redux Logger** - For debugging (logs every action)
3. **Custom middleware** - For API calls, authentication checks, etc.

Example of custom middleware:"

```javascript
// Custom middleware to log actions
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('New state:', store.getState());
  return result;
};

// Or middleware to handle auth tokens
const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'auth/login') {
    // Add token to localStorage
    localStorage.setItem('token', action.payload.token);
  }
  return next(action);
};
```

**Key Points:**
- Explain middleware concept (intercepts actions)
- Give practical examples
- Show you understand the middleware chain

---

## 🔵 TYPESCRIPT - PRACTICAL QUESTIONS

### Q4: **"Convert this React component to TypeScript with proper types:"**

**Given:**
```javascript
function UserProfile({ user, onUpdate }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={() => onUpdate(user.id)}>Update</button>
    </div>
  );
}
```

**Expected Answer:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional
  role?: 'admin' | 'user'; // Union type
}

interface UserProfileProps {
  user: User;
  onUpdate: (userId: number) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={() => onUpdate(user.id)}>Update</button>
    </div>
  );
};

export default UserProfile;
```

**Or using type alias:**
```typescript
type User = {
  id: number;
  name: string;
  email: string;
}

type UserProfileProps = {
  user: User;
  onUpdate: (userId: number) => void;
}
```

**Key Points:**
- Proper interface/type definition
- Function component typing with `React.FC`
- Proper prop types
- Optional properties with `?`

---

### Q5: **"How would you type a custom hook that fetches data?"**

**Expected Answer:**
```typescript
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result: T = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

// Usage
interface Product {
  id: number;
  name: string;
  price: number;
}

function ProductList() {
  const { data, loading, error } = useFetch<Product[]>('/api/products');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

**Key Points:**
- Generic types `<T>`
- Proper typing of async operations
- Error handling with TypeScript
- Optional chaining `data?.map()`

---

### Q6: **"What are TypeScript generics? When would you use them? Give an example."**

**Expected Answer:**
"Generics allow you to create reusable components that work with different types. Instead of using `any`, generics preserve type information.

Example - A reusable API hook:"

```typescript
// Without generics (less flexible)
function fetchData(url: string): Promise<any> {
  return fetch(url).then(res => res.json());
}

// With generics (type-safe)
function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json());
}

// Usage with different types
interface User {
  id: number;
  name: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
}

const user = await fetchData<User>('/api/user');
// user is typed as User, not any
const product = await fetchData<Product>('/api/product');
// product is typed as Product
```

**Key Points:**
- Explain the concept (reusable, type-preserving)
- Show practical example
- Contrast with `any` type

---

## 🟢 TESTING - PRACTICAL QUESTIONS

### Q7: **"Write a test for a cart component that adds items and calculates total."**

**Expected Answer:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from './Cart';
import cartReducer from './cartSlice';

describe('Cart Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { cart: cartReducer }
    });
  });

  test('displays empty cart message when no items', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('adds item to cart and displays it', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);

    expect(screen.getByText(/item added/i)).toBeInTheDocument();
  });

  test('calculates total price correctly', () => {
    const initialState = {
      items: [
        { id: 1, name: 'Test 1', price: 100, quantity: 2 },
        { id: 2, name: 'Test 2', price: 200, quantity: 1 }
      ]
    };

    store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: initialState }
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText(/₹400/i)).toBeInTheDocument();
  });

  test('removes item when delete button clicked', () => {
    const initialState = {
      items: [{ id: 1, name: 'Test', price: 100, quantity: 1 }]
    };

    store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: initialState }
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const deleteButton = screen.getByText('Remove');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });
});
```

**Key Points:**
- Setup Redux store in tests
- Test user interactions
- Test calculations
- Test different states (empty, with items)

---

### Q8: **"How would you test an async API call in a component?"**

**Expected Answer:**
```javascript
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductList from './ProductList';

jest.mock('axios');

describe('ProductList', () => {
  test('fetches and displays products', async () => {
    const mockProducts = [
      { id: 1, name: 'Test 1', price: 100 },
      { id: 2, name: 'Test 2', price: 200 }
    ];

    axios.get.mockResolvedValue({ data: mockProducts });

    render(<ProductList />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith('/api/products');
  });

  test('displays error message when API call fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test('shows loading state initially', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<ProductList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
```

**Key Points:**
- Mock axios
- Use `waitFor` for async operations
- Test loading, success, and error states
- Proper cleanup

---

### Q9: **"How do you test custom hooks?"**

**Expected Answer:**
```javascript
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

describe('useCart hook', () => {
  test('adds item to cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem({ id: 1, name: 'Test', price: 100 });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe('Test');
  });

  test('calculates total correctly', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem({ id: 1, name: 'Test 1', price: 100 });
      result.current.addItem({ id: 2, name: 'Test 2', price: 200 });
    });

    expect(result.current.total).toBe(300);
  });

  test('removes item from cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem({ id: 1, name: 'Test', price: 100 });
      result.current.removeItem(1);
    });

    expect(result.current.items).toHaveLength(0);
  });
});
```

**Key Points:**
- Use `renderHook` for hooks
- Use `act()` for state updates
- Test hook return values

---

## 🟡 REACT - ADVANCED QUESTIONS

### Q10: **"Explain the difference between useCallback and useMemo with examples."**

**Expected Answer:**
"`useCallback` memoizes functions, `useMemo` memoizes values.

**useCallback example:**"
```javascript
function ProductList({ products }) {
  const [filter, setFilter] = useState('');

  // Without useCallback - creates new function on every render
  const handleFilter = (product) => {
    return product.name.includes(filter);
  };

  // With useCallback - same function reference if dependencies unchanged
  const handleFilter = useCallback((product) => {
    return product.name.includes(filter);
  }, [filter]);

  const filteredProducts = useMemo(() => {
    return products.filter(handleFilter);
  }, [products, handleFilter]);

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

"**useMemo example:**"
```javascript
function Cart({ items }) {
  // Expensive calculation - only recompute when items change
  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }, [items]);

  // Without useMemo - recalculates every render
  // const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return <div>Total: ₹{total}</div>;
}
```

**Key Points:**
- Explain when to use each
- Show performance implications
- Give practical examples

---

### Q11: **"How would you implement pagination in React with proper state management?"**

**Expected Answer:**
```javascript
import { useState, useEffect, useMemo } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {paginatedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      
      <div className="pagination">
        <button 
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        
        <button 
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

**Key Points:**
- Proper state management
- useMemo for performance
- Handle edge cases (first/last page)

---

### Q12: **"How would you optimize a React app with many re-renders?"**

**Expected Answer:**
"Several strategies:

1. **React.memo** - Memoize components"
```javascript
const ProductCard = React.memo(({ product, onAddToCart }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add</button>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id;
});
```

"2. **useMemo** for expensive calculations"
```javascript
const expensiveValue = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);
```

"3. **useCallback** to prevent function recreation"
```javascript
const handleClick = useCallback((id) => {
  // handle click
}, [dependencies]);
```

"4. **Code splitting** with lazy loading"
```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loader />}>
  <HeavyComponent />
</Suspense>
```

"5. **Virtualization** for long lists (react-window)"
```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
>
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>
```

**Key Points:**
- Multiple strategies
- Practical examples
- Show understanding of React's rendering

---

## 🎯 WHAT TO REMEMBER

**For Redux:**
- ✅ Know createSlice structure
- ✅ Know how to handle async (createAsyncThunk)
- ✅ Understand middleware concept

**For TypeScript:**
- ✅ Know interfaces vs types
- ✅ Know how to type props and hooks
- ✅ Understand generics basics

**For Testing:**
- ✅ Know how to test components with Redux
- ✅ Know how to test async operations
- ✅ Know how to test custom hooks

**For React:**
- ✅ Know useMemo vs useCallback
- ✅ Know optimization techniques
- ✅ Know state management patterns

---

## 💡 TIPS FOR INTERVIEW

1. **If asked to code:** Start by explaining your approach, then code
2. **If stuck:** "Let me think about the best approach here..."
3. **Connect to your project:** "Similar to what I did in my blood test app..."
4. **Show reasoning:** Even if code isn't perfect, explain WHY you did something

**Good luck! You've got this! 🚀**

