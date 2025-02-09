import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the context data
interface LocalStorageContextType {
  data: { [key: string]: any };
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key: string) => void;
  clearStorage: () => void;
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);

// Create a provider component
export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<{ [key: string]: any }>({});

  // Load data from local storage on initial render
  useEffect(() => {
    const storedData: { [key: string]: any } = {};
    Object.keys(localStorage).forEach((key) => {
      try {
        storedData[key] = JSON.parse(localStorage.getItem(key) || "");
      } catch {
        storedData[key] = localStorage.getItem(key);
      }
    });
    setData(storedData);
  }, []);

  // Function to set an item in local storage
  const setItem = (key: string, value: any) => {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // Function to get an item from local storage
  const getItem = (key: string) => {
    return data[key];
  };

  // Function to remove an item from local storage
  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    setData((prev:any) => {
      const updatedData = { ...prev };
      delete updatedData[key];
      return updatedData;
    });
  };

  // Function to clear all items from local storage
  const clearStorage = () => {
    localStorage.clear();
    setData({});
  };

  return (
    <LocalStorageContext.Provider value={{ data, setItem, getItem, removeItem, clearStorage }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

// Custom hook to use the LocalStorageContext
export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error("useLocalStorage must be used within a LocalStorageProvider");
  }
  return context;
};
