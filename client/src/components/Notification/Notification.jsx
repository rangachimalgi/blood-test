import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = ({ message, type = "success", onClose, duration = 3000, position = "top-right" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Match CSS transition duration
  };

  if (!isVisible) return null;

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  };

  const typeClasses = {
    success: "notification-success",
    error: "notification-error",
    info: "notification-info",
    warning: "notification-warning",
  };

  return (
    <div
      className={`notification ${typeClasses[type]} notification-${position} ${isExiting ? "notification-exit" : ""}`}
      role="alert"
      aria-live="polite"
    >
      <div className="notification-content">
        <span className="notification-icon">{icons[type]}</span>
        <span className="notification-message">{message}</span>
        <button
          className="notification-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      {duration > 0 && (
        <div className="notification-progress">
          <div
            className="notification-progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;

