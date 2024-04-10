import React from "react";
import CurrencyConverter from "./component/CurrencyConverter";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default App;
