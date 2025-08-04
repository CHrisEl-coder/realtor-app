import React from "react";
import { formatCurrency } from "../utils";
import Moment from "react-moment";
import {
  MdLocationOn,
  MdOutlineBathtub,
  MdOutlineSingleBed,
  MdOutlineGarage,
  MdOutlineChair,
  MdOutlineAccessTime,
  MdDeleteOutline,
  MdOutlineEdit,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { DeleteListing } from "../utils";
import { useNavigate } from "react-router-dom";

const ListingTab = ({ listing, id, onDelete, userId }) => {
  const navigate = useNavigate();
  return (
    <article className="relative flex flex-col gap-2 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out w-[300px] overflow-hidden">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="contents w-full h-full"
      >
        <figure className="w-full md:h-auto rounded-t-lg h-[45%]">
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            loading="lazy"
            className="w-full h-[170px] object-cover rounded-t-lg hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </figure>
        <p className="absolute top-2 left-2 flex gap-1 items-center bg-amber-700/70 px-2 py-1 rounded-lg text-white text-[0.7rem] uppercase font-sans font-semibold">
          <MdOutlineAccessTime size={12} />
          <Moment fromNow ago>
            {listing.timeStamp?.toDate()}
          </Moment>
        </p>
        <div className="p-4 space-y-2 h-[55%] flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-2 text-neutral-500 font-sans text-xs font-semibold">
            <div className="flex gap-1 items-center">
              <MdOutlineSingleBed size={15} />
              <p>{listing.bedroom > 1 ? `${listing.bedroom} Beds` : "1 Bed"}</p>
            </div>
            <div className="flex gap-1 items-center">
              <MdOutlineBathtub />
              <p>
                {listing.bathroom > 1 ? `${listing.bathroom} Bath` : "1 Bath"}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <MdOutlineChair />
              <p> {listing.furnished ? "Furnished" : "Not Furnished"} </p>
            </div>
            <div className="flex gap-1 items-center">
              <MdOutlineGarage />
              <p className=" whitespace-nowrap truncate">
                {" "}
                {listing.parking ? "Parking Space " : "No Parking"}
              </p>
            </div>
          </div>

          <p className="text-xl text-teal-800 font-bold ">
            {listing.offer
              ? formatCurrency(listing.discountedPrice)
              : formatCurrency(listing.regularPrice)}{" "}
            / {listing.type === "rent" ? "Month" : ""}
          </p>

          <div className="space-y-2">
            <div className="flex gap-2 items-center text-neutral-500 font-medium text-[0.8rem] truncate">
              <MdLocationOn className="text-red-700" />
              <p>{listing.address}</p>
            </div>
            <h2 className=" text-neutral-900 font-bold font-sans text-xl">
              {listing.name}
            </h2>
            <p className="text-xs text-neutral-500 font-sans whitespace-nowrap truncate">
              {listing.description}
            </p>
          </div>
        </div>
      </Link>
      {listing.userRef === userId && (
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <button
            className=" bg-white p-1 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={() => {
              navigate(`/edit-listing/${id}`);
            }}
          >
            <MdOutlineEdit />
          </button>
          <button
            className=" bg-white p-1 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={() => DeleteListing(id, onDelete)}
          >
            <MdDeleteOutline className=" text-red-800" />
          </button>
        </div>
      )}
    </article>
  );
};

export default ListingTab;
