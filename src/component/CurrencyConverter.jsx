import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  //   for loading
  const [converting, setConverting] = useState(false);

  //   favorite currency
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorite")) || ["INR", "EUR"]
  );

  //  intial currency
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  // -------------get currency data---------------
  const getCurrency = async () => {
    try {
      const resp = await fetch(" https://api.frankfurter.app/currencies");
      const result = await resp.json();
      //   objct.keys method method array fromat me data ko sav kiya hai
      setCurrencies(Object.keys(result));
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getCurrency();
  }, []);
  // -------------get currency data---------------
  // ------------------currency convert----------------
  const handleCurrencyConvert = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const resp = await fetch(
        ` https://api.frankfurter.app/latest?amount=${amount}?from=${fromCurrency}&to=${toCurrency}`
      );
      const result = await resp.json();
      console.log(result);
      setConvertedAmount(result.rates[toCurrency]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setConverting(false);
    }
  };
  // ------------------currency convert----------------

  //   ---------------handle favorite currency logic------------
//   const handlefavorite = (currency) => {
//     const updateFavorite = [...favorite];

//     if (favorite.includes(currency)) {
//       updateFavorite = updateFavorite.filter((fav) => fav !== currency);
//     } else {
//       updateFavorite.push(currency);
//     }
//     setFavorite(updateFavorite);
//     localStorage.setItem("favorite", JSON.stringify(updateFavorite));
//   };

  //   ---------------handle favorite currency logic------------

  // ----swap currency----------------
  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // ----swap currency----------------
  return (
    // center div
    <div className="max-w-xl my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="font-semibold text-2xl">Currency Converter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          favorite={favorite}
          title="From:"
          currencies={currencies}
        //   handlefavorite={handlefavorite}
          setCurrency={setFromCurrency}
          currency={fromCurrency}
        />
        {/* swap currency button */}
        <div className="flex justify-center items-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrency}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <FaArrowRightArrowLeft className="text-gray-700 text-xl" />
          </button>
        </div>

        {/* swap currency button */}
        <CurrencyDropdown
          title="To:"
          favorite={favorite}
          currencies={currencies}
        //   handlefavorite={handlefavorite}
          setCurrency={setToCurrency}
          currency={toCurrency}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          value={amount}
          className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* conver button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleCurrencyConvert}
          className={`px-5 py-2 border border-gray-300 rounded-md bg-indigo-600 text-white
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 *:
        
        ${converting ? "animate-pulse" : ""}
        `}
        >
          convert
        </button>
      </div>
      {/* conver button */}

      {/* converted Amount */}
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          converted Amount :{convertedAmount}
        </div>
      )}
      {/* converted Amount */}
    </div>
  );
};
export default CurrencyConverter;
