import { createContext, useContext, useState } from "react";

const filterContext = createContext();
export const useFilterContext = () => useContext(filterContext);

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    ram: [],
    storage: [],
    price: [],
    rating: 0,
    sortPrice: "",
  });

  // General handlers for all checkboxes
  const updateFilter = (type, value) => {
    setFilter((prev) => {
      const files = prev[type].includes(value);

      return {
        ...prev,
        [type]: files
          ? prev[type].filter((val) => val !== value)
          : [...prev[type], value],
      };
    });
  };

  // Rating slider handler
  const updateRating = (value) => {
    setFilter((prev) => ({
      ...prev,
      rating: Number(value),
    }));
  };

  // Price sorting
  const updateSortPrice = (value) => {
    setFilter((prev) => ({
      ...prev,
      sortPrice: value,
    }));
  };

  const clearFilter = () => {
    setFilter({
      ram: [],
      storage: [],
      price: [],
      rating: 0,
    });
  };

  return (
    <filterContext.Provider
      value={{ filter, updateFilter, updateRating, updateSortPrice, clearFilter }}
    >
      {children}
    </filterContext.Provider>
  );
};
