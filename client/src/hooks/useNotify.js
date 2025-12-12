import { useNotification } from "../components/Notification/NotificationManager";
import { toast } from "react-toastify";

// Set this to 'custom' to use custom notifications, 'toast' for react-toastify
const NOTIFICATION_TYPE = 'custom'; // Change to 'toast' if you want to use toast instead

export const useNotify = () => {
  const customNotify = useNotification();

  const notify = {
    success: (message, options = {}) => {
      if (NOTIFICATION_TYPE === 'custom') {
        customNotify.success(message, {
          duration: options.duration || 3000,
          position: options.position || 'top-right',
        });
      } else {
        toast.success(message, {
          position: options.position || "top-right",
          autoClose: options.duration || 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    error: (message, options = {}) => {
      if (NOTIFICATION_TYPE === 'custom') {
        customNotify.error(message, {
          duration: options.duration || 4000,
          position: options.position || 'top-right',
        });
      } else {
        toast.error(message, {
          position: options.position || "top-right",
          autoClose: options.duration || 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    info: (message, options = {}) => {
      if (NOTIFICATION_TYPE === 'custom') {
        customNotify.info(message, {
          duration: options.duration || 3000,
          position: options.position || 'top-right',
        });
      } else {
        toast.info(message, {
          position: options.position || "top-right",
          autoClose: options.duration || 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    warning: (message, options = {}) => {
      if (NOTIFICATION_TYPE === 'custom') {
        customNotify.warning(message, {
          duration: options.duration || 3000,
          position: options.position || 'top-right',
        });
      } else {
        toast.warning(message, {
          position: options.position || "top-right",
          autoClose: options.duration || 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  };

  return notify;
};

