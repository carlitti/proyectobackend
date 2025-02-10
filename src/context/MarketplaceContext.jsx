import { createContext, useContext, useState } from "react";

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const addProduct = (product) => {
        setProducts([...products, product]);
    };

    return (
        <MarketplaceContext.Provider value={{ products, addProduct }}>
            {children}
        </MarketplaceContext.Provider>
    );
};

export const useMarketplace = () => useContext(MarketplaceContext);

