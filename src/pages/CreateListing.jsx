import React, { useState } from "react";

const CreateListing = () => {
  const [listingData, setListingData] = useState({
    type: "rent",
    name: "",
    bedroom: 1,
    bathroom: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    reggularPrice: 0,
    discountedPrice: 0,
    images: {},
  });

  const {
    type,
    name,
    bedroom,
    bathroom,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = listingData;

  const handleClick = () => {};

  return (
    <main className=" max-w-md px-2 mx-auto">
      <form>
        <h1 className=" text-3xl text-center mt-6 font-bold">Create Listing</h1>

        <p className=" font-semibold text-lg mb-1">Sell / Rent</p>
        <div className=" flex gap-4 mb-6">
          <button
            type="button"
            id="sale"
            value="sale"
            className={` w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg hover:bg-white focus:bg-white focus:text-gray-700 focus:border-slate-600 transition duration-300 ease-in-out rounded ${
              type === "sale"
                ? "text-white bg-amber-900"
                : " text-black bg-white"
            }`}
          >
            Sell
          </button>

          <button
            type="button"
            id="rent"
            value="rent"
            onClick={handleClick}
            className={` w-full px-2 py-3 rounded border border-slate-300 uppercase font-medium shadow-md hover:shadow-lg focus:border-slate-600 transition duration-300 ease-in-out ${
              type === "rent"
                ? " bg-amber-900 text-white"
                : "bg-white text-black"
            }`}
          >
            Rent
          </button>
        </div>

        <p className=" text-lg font-semibold mb-1">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={handleClick}
          className=" w-full px-2 py-3 border border-slate-300 rounded text-gray-700  placeholder:text-gray-600 outline-none focus:bg-white mb-6"
        />

        <div className="flex gap-4 mb-6">
          <div className=" flex flex-col gap-1">
            <p className=" text-lg font-semibold">Bed</p>
            <input
              type="number"
              id="bed"
              value={bedroom}
              max={50}
              min={1}
              required
              onChange={handleClick}
              className=" w-full px-7 py-3 shadow-md bg-white border border-slate-300 rounded outline-none hover:bg-white focus:bg-white transition duration-300 ease-out "
            />
          </div>
          <div className=" flex flex-col gap-1">
            <p className=" font-semibold text-lg">Bath</p>
            <input
              type="number"
              id="bath"
              value={bathroom}
              max={50}
              min={1}
              required
              onChange={handleClick}
              className=" w-full px-7 py-3 shadow-md bg-white border border-slate-300 rounded outline-none hover:bg-white focus:bg-white transition duration-300 ease-out "
            />
          </div>
        </div>

        <div className="mb-6">
          <p className=" text-lg font-semibold mb-1">Parking Spot</p>
          <div className=" flex gap-4">
            <button
              type="button"
              id="parking"
              value={true}
              className={` w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg focus:text-gray-700 focus:border-slate-600 transition duration-300 ease-in-out rounded ${
                !parking ? " text-black bg-white" : "text-white bg-amber-900"
              }`}
            >
              Yes
            </button>

            <button
              type="button"
              id="parking"
              value={false}
              className={` w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg focus:text-gray-700 focus:border-slate-600 transition duration-300 ease-in-out rounded ${
                parking ? "text-black bg-white" : "text-white bg-amber-900"
              }`}
            >
              No
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold mb-1">Furnished</p>
          <div className=" flex gap-4">
            <button
              type="button"
              id="furnished"
              value={true}
              className={` w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg focus:text-gray-700 focus:border-slate-600 transition duration-300 ease-in-out rounded ${
                !furnished ? " text-black bg-white" : "text-white bg-amber-900"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              className={` w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg focus:text-gray-700 focus:border-slate-600 transition duration-300 ease-in-out rounded ${
                furnished ? " text-black bg-white" : "text-white bg-amber-900"
              }`}
            >
              No
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold mb-1"> Address </p>
          <textarea
            placeholder="Address"
            id="address"
            value={address}
            onChange={handleClick}
            className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:border-slate-600 outline-none text-xl transition duration-300 ease-in-out"
          />
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold mb-1"> Description </p>
          <textarea
            placeholder="Description"
            id="description"
            value={description}
            onChange={handleClick}
            className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:border-slate-600 outline-none text-xl transition duration-300 ease-in-out"
          />
        </div>

        <div className="mb-6">
          <p className=" text-lg font-semibold mb-1"> Offer </p>
          <div className="  flex gap-4">
            <button
              type="button"
              id="offer"
              value={true}
              className={`w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg focus:text-gray-700 focus:border-slate-600 transition duration-300 ease-in-out rounded ${
                offer === true
                  ? "text-white bg-amber-900"
                  : " text-black bg-white"
              }`}
            >
              Yes
            </button>
            <button
              id="offer"
              type="button"
              value={false}
              className={`w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg focus:text-gray-700 focus:border-slate-600 transition duration-300 ease-in-out rounded ${
                offer === false
                  ? "text-white bg-amber-900"
                  : " text-black bg-white"
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className=" flex flex-col">
            <p className=" font-semibold text-lg mb-1"> Regular Price </p>
            <div className=" flex gap-4 items-center justify-start">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={handleClick}
                className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:border-slate-600 outline-none text-xl transition duration-300 ease-in-out text-gray-700"
                min={50}
                max={40000}
                required
              />
              {type === "rent" && (
                <p className=" text-xl w-full "> $ / Month</p>
              )}
            </div>
          </div>
        </div>

        {offer && (
          <div className="mb-6">
            <div className=" flex flex-col">
              <p className=" font-semibold text-lg mb-1">Discounted Price </p>
              <div className=" flex gap-4 items-center justify-start">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={handleClick}
                  className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:border-slate-600 outline-none text-xl transition duration-300 ease-in-out text-gray-700"
                  min={50}
                  max={40000}
                  required={offer}
                />
                {type === "rent" && (
                  <p className=" text-xl w-full "> $ / Month</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className=" mb-6">
          <p className=" text-lg font-semibold mb-1"> Images </p>
          <p className=" text-sm text-gray-600 mb-2">
            The first image will be the cover (max 6).
          </p>
          <input
            type="file"
            id="images"
            accept=".jpg,.png,.jpeg,.gif"
            onChange={handleClick}
            multiple
            required
            className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:border-slate-600 outline-none text-xl transition duration-300 ease-in-out text-gray-700"
          />
        </div>

        <button className=" bg-amber-900 w-full py-4 px-7 font-medium text-white rounded hover:bg-amber-950 hover:text-white focus:bg-amber-800 transition duration-300 ease-out mb-6">
          Create Listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
