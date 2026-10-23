import { createContext, useContext, useState } from "react";

const filterContext = createContext();
export const useFilterContext = () => useContext(filterContext);

export const FilterProvider = ({ children }) => {

    const [ filter, setFilter ] = useState({
        ram: [], storage: [], price: []
    });

    // General handlers for all checkboxes
    const updateFilter = (type, value) => {
        setFilter((prev)=> {
            const files = prev[type].includes(value); 

            return {
                ...prev,
                [type]: files ? prev[type].filter((val)=> val !== value) : [...prev[type], value]
            };
        });
    };

    const clearFilter = () => {
        setFilter({
            ram: [], storage: [], price: []
        })
    }

    return (
        <filterContext.Provider value={{filter, updateFilter, clearFilter}}>
            {children}
        </filterContext.Provider>
    )
}