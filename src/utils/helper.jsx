import { toast } from "react-toastify";

export const url = process.env.REACT_APP_API_ENDPOINT || "";

//GET LOCAL STORAGE ITEM
export const getLocalStorageItem = (key) => localStorage.getItem(key);

//SET VALUE TO LOCAL STORAGE
export const setLocalStorageItem = (key, value) =>
  localStorage.setItem(key, value);

//REMOVE ITEM FROM LOCALSTORAGE
export const removeLocalStorageItem = (key) => localStorage.removeItem(key);

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// For calling the toastify alert
export const notifySuccess = (() => {
  let hasToastBeenShown = false;
  return (message) => {
    if (!hasToastBeenShown) {
      hasToastBeenShown = true;

      const toastId = toast.success(message, {
        position: "top-center",
        autoClose: 700,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        onClose: () => {
          hasToastBeenShown = false; // Reset the flag when the toast is closed.
        },
      });
      return toastId;
    }
  };
})();

export const notifyWarning = (() => {
  let hasToastBeenShown = false;
  return (message) => {
    if (!hasToastBeenShown) {
      hasToastBeenShown = true;

      const toastId = toast.error(message, {
        position: "top-center",
        autoClose: 700,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        onClose: () => {
          hasToastBeenShown = false; // Reset the flag when the toast is closed.
        },
      });

      return toastId;
    }
  };
})();

export const notifyError = (() => {
  let hasToastBeenShown = false;
  return (message) => {
    if (!hasToastBeenShown) {
      hasToastBeenShown = true;

      const toastId = toast.error(message, {
        position: "top-center",
        autoClose: 700,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        onClose: () => {
          hasToastBeenShown = false; // Reset the flag when the toast is closed.
        },
      });

      return toastId;
    }
  };
})();

