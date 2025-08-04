import React from "react";
import { MdLocationOn } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

const Search = () => {
  return (
    <div className="max-w-4xl mx-auto relative -top-4 z-50">
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h2 className="text-sm font-sans font-medium">
          {" "}
          Search for listed properties
        </h2>
        <div className="mt-2 flex flex-col md:flex-row gap-8 items-center">
          <form className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center border border-gray-300 rounded px-2 py-1">
              <input
                type="text"
                placeholder="Location"
                id="location"
                className="bg-transparent outline-none flex-1"
              />
              <MdLocationOn className="text-amber-600" />
            </div>
            <div className="flex items-center border border-gray-300 rounded px-2 py-1">
              <input
                type="text"
                placeholder="Budget"
                id="budget"
                className="bg-transparent outline-none flex-1"
              />
              <RiMoneyDollarCircleFill className="text-amber-600" />
            </div>
            <div className="flex items-center border border-gray-300 rounded px-2 py-1">
              <input
                type="text"
                placeholder="Property Type"
                id="type"
                className="bg-transparent outline-none flex-1"
              />
              <FaHome className="text-amber-600" />
            </div>
          </form>
          <button className="px-8 py-1 bg-amber-600 text-white font-medium text-sm rounded hover:bg-amber-700 transition-colors duration-200">
            {" "}
            Search{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
