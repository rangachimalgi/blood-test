# Custom Notification System

A beautiful, customizable notification component that can replace or complement react-toastify.

## Features

- 🎨 **Modern Design** - Clean, professional look with smooth animations
- 📱 **Responsive** - Works perfectly on mobile and desktop
- 🎯 **Multiple Positions** - Top/bottom, left/right, center
- 🎨 **4 Types** - Success, Error, Info, Warning with color-coded styling
- ⏱️ **Auto-dismiss** - Configurable duration with progress bar
- 🎭 **Smooth Animations** - Slide-in/out animations
- ♿ **Accessible** - ARIA labels and proper semantic HTML

## Usage

### Option 1: Use the Custom Notification Hook

```jsx
import { useNotification } from '../components/Notification/NotificationManager';

function MyComponent() {
  const notify = useNotification();

  const handleClick = () => {
    notify.success('Item added to cart!');
    // or
    notify.error('Something went wrong');
    // or
    notify.info('Processing...');
    // or
    notify.warning('Please check your input');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Option 2: Use the Unified Hook (Switch between toast/custom)

Update `client/src/hooks/useNotify.js` and change:
```javascript
const NOTIFICATION_TYPE = 'custom'; // or 'toast'
```

Then use:
```jsx
import { useNotify } from '../hooks/useNotify';

function MyComponent() {
  const notify = useNotify();
  
  notify.success('Item added!');
}
```

## Position Options

- `top-right` (default)
- `top-left`
- `top-center`
- `bottom-right`
- `bottom-left`
- `bottom-center`

## Example

```jsx
notify.success('Order placed!', {
  duration: 5000,
  position: 'top-center'
});
```

## Customization

Edit `Notification.css` to customize:
- Colors
- Animations
- Sizes
- Spacing
- Shadows

## Comparison with Toast

**Custom Notifications:**
- ✅ More control over design
- ✅ Better mobile experience
- ✅ Custom animations
- ✅ Progress bar indicator
- ❌ More code to maintain

**React-Toastify:**
- ✅ Battle-tested library
- ✅ Many built-in features
- ✅ Less code
- ❌ Less customizable

You can use both simultaneously or switch between them!

