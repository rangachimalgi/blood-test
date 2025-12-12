import React, { createContext, useContext, useState, useCallback } from "react";
import Notification from "./Notification";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    // Return a no-op function if used outside provider (for backward compatibility)
    return {
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {},
      showNotification: () => {},
    };
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = "success", options = {}) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type,
      duration: options.duration || 3000,
      position: options.position || "top-right",
    };

    setNotifications((prev) => [...prev, notification]);

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const success = useCallback((message, options) => {
    return showNotification(message, "success", options);
  }, [showNotification]);

  const error = useCallback((message, options) => {
    return showNotification(message, "error", options);
  }, [showNotification]);

  const info = useCallback((message, options) => {
    return showNotification(message, "info", options);
  }, [showNotification]);

  const warning = useCallback((message, options) => {
    return showNotification(message, "warning", options);
  }, [showNotification]);

  return (
    <NotificationContext.Provider value={{ success, error, info, warning, showNotification }}>
      {children}
      <div className="notification-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            position={notification.position}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

