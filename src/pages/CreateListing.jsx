import React, { useState } from "react";
import Loader from "../components/Loader";
import { Geolocation, storeImage } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CreateListing = () => {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    regularPrice: "",
    discountedPrice: "",
    latitude: "",
    longitude: "",
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
    latitude,
    longitude,
    images,
  } = listingData;

  const handleClick = (e) => {
    const { id, value, type: inputType } = e.target;
    if (
      inputType === "button" &&
      ["parking", "furnished", "offer"].includes(id)
    ) {
      setListingData((prevData) => ({
        ...prevData,
        [id]: value === "true",
      }));
    } else if (inputType === "button" && ["sale", "rent"].includes(id)) {
      setListingData((prevData) => ({
        ...prevData,
        type: value,
      }));
    } else if (inputType === "file") {
      const files = e.target.files;

      setListingData((prevData) => ({
        ...prevData,
        images: files,
      }));
    } else {
      setListingData((prevData) => ({
        ...prevData,
        [id]: inputType === "number" ? parseInt(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    let geometry = {};

    e.preventDefault();

    setIsLoading(true);

    // check if discounted price is lower than regular price
    if (discountedPrice && discountedPrice >= regularPrice) {
      setIsLoading(false);
      toast.error("Discount price must be lower than the regular price.");
      return;
    }

    // first of all we would check whether the address is valid or not

    if (!address) {
      setIsLoading(false);
      toast.error("Pleas enter a valid address");
      return;
    }

    try {
      const coords = await Geolocation(address);

      if (!coords) {
        setIsLoading(false);
        toast.error(
          "Failed to fetch location coordinates, Please input a valid address."
        );
        return;
      }

      geometry = {
        ltd: coords.latitude,
        lng: coords.longitude,
      };

      const auth = getAuth();
      const userId = auth.currentUser.uid;

      if (!images || images.length === 0) {
        setIsLoading(false);
        toast.error("Please upload at least one image.");
        return;
      }

      const imageUrls = await Promise.allSettled(
        [...images].map((image) => storeImage(image, userId))
      );

      const imageUrlsSuccess = imageUrls
        .filter((res) => res.status === "fulfilled")
        .map((res) => res.value);

      if (imageUrlsSuccess.length === 0) {
        setIsLoading(false);
        toast.error("Images upload failed, please try again.");
        return;
      }

      const submitData = {
        ...listingData,
        geometry,
        imageUrls: imageUrlsSuccess,
        userRef: userId,
        timeStamp: serverTimestamp(),
      };

      delete submitData.images;
      !offer && delete submitData.discountedPrice;
      delete submitData.latitude;
      delete submitData.longitude;

      const docRef = await addDoc(collection(db, "listings"), submitData);

      toast.success("Listing created successfully");
      navigate(`/category/${submitData.type}/${docRef.id}`);
    } catch (error) {
      console.error(
        "Error creating listing: ",
        error?.response?.data?.message || error.message || error
      );
      toast.error("Failed to create listing, Pleas try again");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className=" max-w-md px-2 mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className=" text-3xl text-center mt-6 font-bold">Create Listing</h1>

        <p className=" font-semibold text-lg mb-1">Sell / Rent</p>
        <div className=" flex gap-4 mb-6">
          <button
            type="button"
            id="sale"
            value="sale"
            onClick={handleClick}
            className={` w-full px-2 py-3 border border-slate-300 uppercase font-medium hover:shadow-lg focus:border-slate-600 transition duration-150 ease-in-out rounded ${
              type === "rent"
                ? "text-black bg-white"
                : " text-white bg-amber-900 shadow-md"
            }`}
          >
            Sell
          </button>

          <button
            type="button"
            id="rent"
            value="rent"
            onClick={handleClick}
            className={` w-full px-2 py-3 rounded border border-slate-300 uppercase font-medium hover:shadow-lg focus:border-slate-600 transition duration-150 ease-in-out ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-amber-900 text-white shadow-md"
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
          required
          minLength={8}
          maxLength={50}
          className=" w-full px-2 py-3 border border-slate-300 rounded text-gray-700  placeholder:text-gray-600 outline-none focus:bg-white focus:shadow-md mb-6"
        />

        <div className="flex gap-4 mb-6">
          <div className="w-full flex flex-col gap-1">
            <p className="text-lg font-semibold">Bed</p>
            <input
              type="number"
              id="bedroom"
              value={bedroom}
              max={10}
              min={1}
              required
              onChange={handleClick}
              className="w-full px-7 py-3 bg-white border border-slate-300 rounded outline-none transition duration-150 ease-in-out focus:ring-0 focus:border-slate-300 focus:shadow-md "
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className=" font-semibold text-lg">Bath</p>
            <input
              type="number"
              id="bathroom"
              value={bathroom}
              max={10}
              min={1}
              required
              onChange={handleClick}
              className=" w-full px-7 py-3 bg-white border border-slate-300 rounded outline-none hover:bg-white focus:bg-white focus:border-slate-300 focus:shadow-md focus:ring-0 transition duration-150 ease-out "
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
              onClick={handleClick}
              className={` w-full px-2 py-3 border border-slate-300 uppercase font-medium hover:shadow-lg focus:border-slate-600 transition duration-150 ease-in-out rounded ${
                !parking
                  ? "text-black bg-white"
                  : "text-white bg-amber-900 shadow-md "
              }`}
            >
              Yes
            </button>

            <button
              type="button"
              id="parking"
              onClick={handleClick}
              value={false}
              className={` w-full px-2 py-3 border border-slate-300 uppercase font-medium hover:shadow-lg focus:border-slate-600 transition duration-150 ease-in-out rounded ${
                parking
                  ? "text-black bg-white"
                  : "text-white bg-amber-900 shadow-md"
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
              onClick={handleClick}
              className={` w-full px-2 py-3 border border-slate-300 uppercase font-medium hover:shadow-lg focus:border-slate-600 transition duration-150 ease-in-out rounded ${
                !furnished
                  ? " text-black bg-white"
                  : "text-white bg-amber-900 shadow-md"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              onClick={handleClick}
              className={` w-full px-2 py-3 border border-slate-300 uppercase font-medium hover:shadow-lg focus:border-slate-600 transition duration-150 ease-in-out rounded ${
                furnished
                  ? " text-black bg-white"
                  : "text-white bg-amber-900 shadow-md"
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
            className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:shadow-md outline-none text-xl transition duration-150 ease-in-out"
          />
        </div>
        <div className={`mb-6 flex gap-4 ${locationEnabled ? "hidden" : ""}`}>
          <div className="w-full">
            <p className="font-semibold text-lg mb-1"> Latitude </p>
            <input
              type="number"
              id="latitude"
              min={-80}
              max={80}
              value={latitude}
              onChange={handleClick}
              className="w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:border-slate-300 focus:ring-0 focus:outline-none focus:shadow-md outline-none text-xl transition duration-150 ease-in-out"
            />
          </div>

          <div className="w-full">
            <p className="font-semibold text-lg mb-1"> Longitude </p>
            <input
              type="number"
              id="longitude"
              min={-180}
              max={180}
              value={longitude}
              onChange={handleClick}
              className="w-full border border-slate-300 px-4 py-2 rounded outline-none text-xl transition duration-300 ease-in-out focus:bg-white focus:border-slate-300 focus:ring-0 focus:outline-none focus:shadow-md"
            />
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold mb-1"> Description </p>
          <textarea
            placeholder="Description"
            id="description"
            value={description}
            onChange={handleClick}
            className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:shadow-md outline-none text-xl transition duration-150 ease-in-out"
          />
        </div>

        <div className="mb-6">
          <p className=" text-lg font-semibold mb-1"> Offer </p>
          <div className="  flex gap-4">
            <button
              type="button"
              id="offer"
              value={true}
              onClick={handleClick}
              className={`w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg focus:border-slate-600 transition duration-150 ease-in-out rounded ${
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
              onClick={handleClick}
              className={`w-full px-2 py-3 shadow-md border border-slate-300 uppercase font-medium hover:shadow-lg focus:border-slate-600 transition duration-150 ease-in-out rounded ${
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
                className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:shadow-md outline-none text-xl transition duration-150 ease-in-out text-gray-700"
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
                  className=" w-full border border-slate-300 px-4 py-2 rounded focus:bg-white focus:shadow-md outline-none text-xl transition duration-300 ease-in-out text-gray-700"
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
