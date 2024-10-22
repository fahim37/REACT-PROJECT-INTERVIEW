import React, { createContext, useContext, useState } from "react";

const PurchaseFormContext = createContext();

export const PurchaseFormProvider = ({ children }) => {
  const [purchaseData, setPurchaseData] = useState(null);

  return (
    <PurchaseFormContext.Provider value={{ purchaseData, setPurchaseData }}>
      {children}
    </PurchaseFormContext.Provider>
  );
};

export { PurchaseFormContext };
