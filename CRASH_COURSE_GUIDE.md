# 🚀 Crash Course: Redux, TypeScript, Testing (8 Hours Total)

## ⚠️ READ THIS FIRST
If you're going to say you've used these, you MUST know these basics. Study this guide, then practice.

---

## 📚 PART 1: REDUX BASICS (3 hours)

### What You Need to Know:

#### 1. Core Concepts (30 min read)
- **Store**: Single source of truth for app state
- **Actions**: Plain objects describing what happened `{ type: 'ADD_TO_CART', payload: product }`
- **Reducers**: Pure functions that update state `(state, action) => newState`
- **Dispatch**: Function to send actions to store
- **Selectors**: Functions to get data from store

#### 2. Redux Toolkit (Modern Way) - 2 hours
```javascript
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.qty += action.payload.qty || 1;
      } else {
        state.push({ ...action.payload, qty: action.payload.qty || 1 });
      }
    },
    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    updateQty: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) item.qty = action.payload.qty;
    }
  }
});

export const { addItem, removeItem, updateQty } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});
```

#### 3. Using in React Components (30 min)
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from './store';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

### What Interviewers Will Ask:
- **Q: "How is Redux different from Context API?"**
  - A: "Redux provides a predictable state container with time-travel debugging, middleware support, and devtools. Context API is simpler but doesn't scale well for complex state updates. Redux is better for large apps with lots of shared state."

- **Q: "What are Redux middleware? Give an example."**
  - A: "Middleware like redux-thunk allows action creators to return functions instead of plain objects, enabling async operations. For example, fetching data from an API before dispatching an action."

### PRACTICE TASK:
Create a Redux store for your cart functionality. Convert ONE component to use Redux instead of Context.

---

## 📚 PART 2: TYPESCRIPT BASICS (2 hours)

### What You Need to Know:

#### 1. Basic Types (30 min)
```typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let items: string[] = ["apple", "banana"];
let numbers: number[] = [1, 2, 3];

// Objects
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean; // Optional property
}

let user: User = {
  id: 1,
  name: "John",
  email: "john@example.com"
};
```

#### 2. React with TypeScript (1 hour)
```typescript
// Component props
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
  };
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
};
```

#### 3. Common Patterns (30 min)
```typescript
// Generic types
function getData<T>(id: T): T {
  return id;
}

// Union types
type Status = 'pending' | 'success' | 'error';

// Type assertions
const userInput = document.getElementById('input') as HTMLInputElement;
```

### What Interviewers Will Ask:
- **Q: "Why use TypeScript?"**
  - A: "TypeScript catches errors at compile-time, improves IDE autocomplete, makes refactoring safer, and serves as documentation for other developers."

- **Q: "What's the difference between interface and type?"**
  - A: "Interfaces can be extended and merged, better for object shapes. Types can represent unions, intersections, and primitives. Generally use interfaces for objects, types for complex types."

### PRACTICE TASK:
Convert CheckoutForm.js to CheckoutForm.tsx. Add types for all props and state.

---

## 📚 PART 3: TESTING BASICS (3 hours)

### What You Need to Know:

#### 1. Jest + React Testing Library (1 hour)
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from './Cart';

describe('Cart Component', () => {
  test('renders empty cart message when cart is empty', () => {
    render(<Cart items={[]} />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('adds item to cart when button clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAdd={mockAddToCart} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('calculates total price correctly', () => {
    const items = [
      { id: 1, price: 100, qty: 2 },
      { id: 2, price: 200, qty: 1 }
    ];
    render(<Cart items={items} />);
    
    expect(screen.getByText(/400/i)).toBeInTheDocument();
  });
});
```

#### 2. Testing Hooks (30 min)
```javascript
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

test('adds item to cart', () => {
  const { result } = renderHook(() => useCart());
  
  act(() => {
    result.current.addItem({ id: 1, name: 'Test' });
  });
  
  expect(result.current.items).toHaveLength(1);
});
```

#### 3. Testing API Calls (30 min)
```javascript
import axios from 'axios';
jest.mock('axios');

test('fetches packages on mount', async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Package 1' }] });
  
  render(<PackageList />);
  
  await waitFor(() => {
    expect(screen.getByText('Package 1')).toBeInTheDocument();
  });
});
```

#### 4. E2E Testing with Cypress (1 hour)
```javascript
describe('Cart Flow', () => {
  it('allows user to add items and checkout', () => {
    cy.visit('/shop');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('button:contains("Add to Cart")').click();
    cy.visit('/cart');
    cy.get('button:contains("Checkout")').click();
    cy.url().should('include', '/checkout');
  });
});
```

### What Interviewers Will Ask:
- **Q: "What's the difference between unit and integration tests?"**
  - A: "Unit tests test individual functions/components in isolation. Integration tests test how multiple components work together. E2E tests simulate real user workflows."

- **Q: "How do you mock API calls in tests?"**
  - A: "I use jest.mock() or MSW (Mock Service Worker) to intercept HTTP requests and return mock responses, allowing tests to run without hitting real APIs."

### PRACTICE TASK:
Write 5 tests for your Cart component:
1. Renders empty cart message
2. Displays items correctly
3. Calculates total correctly
4. Removes item when delete clicked
5. Updates quantity correctly

---

## 🎯 INTERVIEW CHEAT SHEET

### If Asked About Redux:
✅ DO SAY:
- "I used Redux Toolkit for state management because it's the modern standard"
- "I structured my store with feature-based slices"
- "I used useSelector and useDispatch hooks for component integration"
- "I implemented middleware for async operations like API calls"

❌ DON'T SAY:
- "I'm not sure how reducers work"
- "I've never used Redux Toolkit" (if you claimed experience)

### If Asked About TypeScript:
✅ DO SAY:
- "I use interfaces for component props and object shapes"
- "I leverage type inference but explicitly type function parameters and returns"
- "I use union types for status states and optional properties for flexibility"
- "TypeScript caught several bugs during development"

❌ DON'T SAY:
- "I mostly use `any` type" (red flag!)
- "I'm not sure about generics"

### If Asked About Testing:
✅ DO SAY:
- "I write unit tests for components and utilities using Jest and React Testing Library"
- "I use integration tests to verify API interactions"
- "I follow the AAA pattern: Arrange, Act, Assert"
- "I mock external dependencies to keep tests isolated"

❌ DON'T SAY:
- "I haven't written many tests" (if you claimed experience)
- "Testing is boring" (red flag!)

---

## ⏰ STUDY PLAN (8 Hours Total)

**Day 1 (3 hours):**
- Morning: Redux basics + create a small demo
- Afternoon: TypeScript basics + convert 1 component

**Day 2 (3 hours):**
- Morning: Testing basics + write 5 tests
- Afternoon: Review all concepts + practice explaining

**Day 3 (2 hours):**
- Mock interview prep
- Review cheat sheet
- Practice live coding

---

## 🚨 FINAL WARNING

If you claim experience but can't:
- Write a Redux reducer on the spot
- Create a TypeScript interface
- Write a simple test

**You WILL be caught and likely rejected.**

Better to say: "I'm learning Redux/TypeScript/testing, here's what I understand..." than to lie and get caught.

---

## ✅ READY CHECKLIST

Before the interview, make sure you can:
- [ ] Explain Redux store architecture
- [ ] Write a Redux action and reducer
- [ ] Create a TypeScript interface for a component
- [ ] Write a test using React Testing Library
- [ ] Explain when to use Redux vs Context
- [ ] Mock an API call in a test
- [ ] Explain TypeScript benefits

Good luck! 🍀

