import React from "react";
import { FaRegStar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const CurrencyDropdown = ({
  currencies,
  title,
  currency,
  setCurrency,
  favorite,
}) => {
  const isFavorite = (current) => favorite.includes(current);

  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        {/* render favorite */}

        <hr />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2
        focus:ring-indigo-500 focus:ring-offset-2
        "
        >
          {favorite?.map((currency) => (
            <option className="bg-gray-200" value={currency} key={currency}>
              {currency}
            </option>
          ))}
          {currencies
            ?.filter((currency) => !favorite.includes(currency))
            .map((currency) => (
              <option value={currency} key={currency}>
                {currency}
              </option>
            ))}
        </select>

        {/* select favorite currency */}
        {/* <button
          onClick={handlefavorite}
          className="absolute right-0 flex items-center text-sm inset-y-0 leading-5 pr-5"
        >
          {isFavorite(currency) ? (
            <FaRegStar />
        ) : (
            <AiFillStar className="text-yellow-600" />
          )}
        </button> */}
      </div>
    </div>
  );
};

export default CurrencyDropdown;
