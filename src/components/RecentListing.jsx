import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import {
  MdAccessAlarm,
  MdOutlineBathtub,
  MdOutlineLocationOn,
  MdOutlineSingleBed,
} from "react-icons/md";
import { formatCurrency } from "../utils";
import Moment from "react-moment";

const RecentListing = () => {
  const [listings, setListings] = useState([]);
  const docRef = collection(db, "listings");

  useEffect(() => {
    const fetchListing = async () => {
      const q = query(docRef, limit(8), orderBy("timeStamp", "desc"));

      try {
        const listingSnap = await getDocs(q);

        const data = listingSnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setListings(data);
      } catch (error) {
        console.error("Error fetching listing", error);
      }
    };

    fetchListing();
  });

  return (
    <section className="max-w-6xl mx-auto p-4 bg-neutral-100 mt-4">
      <h2 className="text-lg text-neutral-400 font-medium font-sans border-b border-b-white border-spacing-y-2">
        Recent Listings
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto place-items-center gap-4 px-4 py-2">
        {listings.length > 0 &&
          listings.map((l, index) => (
            <article className=" relative w-full md:max-w-[300px] shadow-md rounded-md flex flex-col ">
              <figure className="relative h-48 overflow-hidden rounded-t-md">
                <img
                  src={l.imageUrls[0]}
                  alt={`listingImage${index}`}
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="flex-1 flex flex-col items-start gap-2">
                <div className="flex gap-4 items-center mt-2">
                  <div className="flex items-center gap-1">
                    <MdOutlineSingleBed className="text-neutral-400" />
                    <p className="text-[.7rem] text-neutral-400 font-sans font-medium bg-neutral-200 px-2 rounded-xl">
                      {l.bedroom > 1 ? `${l.bedroom} Beds` : "1 Bed"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdOutlineBathtub className="text-neutral-400" size={13} />
                    <p className="text-[.7rem] text-neutral-400 font-sans font-medium bg-neutral-200 px-2 rounded-xl">
                      {l.bedroom > 1 ? `${l.bathroom} Baths` : "1 Bath"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="leading-6 text-lg font-semibold font-sans text-neutral-900 truncate">
                    {l.name} <br />{" "}
                    <sub className="flex items-center gap-1 text-xs text-neutral-400 font-sans mb-4 mt-2">
                      <MdOutlineLocationOn className="text-neutral-400" />
                      {l.address}
                    </sub>
                  </p>
                  <p className=" flex items-center gap-1 text-xl text-teal-700 font-sans font-bold ">
                    {l.offer
                      ? `${formatCurrency(l.discountedPrice)} `
                      : formatCurrency(l.regularPrice)}
                    {l.offer && (
                      <span className="text-xs font-sans font-normal text-red-500 line-through">
                        {formatCurrency(l.regularPrice)}
                      </span>
                    )}
                  </p>
                </div>

                <button className="px-8 py-2 text-white text-xs font-sans font-medium bg-amber-600 hover:bg-amber-700 rounded-e transition-colors duration-200 mb-2">
                  {l.type === "rent" ? "Rent" : "Buy"}
                </button>
              </div>
              <p className="absolute top-2 right-2 flex items-center gap-1 bg-white text-amber-600 text-xs font-sans font-medium px-2 py-1 rounded-md">
                <MdAccessAlarm />
                <Moment fromNow ago>
                  {l.timeStamp.toDate()}
                </Moment>
              </p>
            </article>
          ))}
      </div>
    </section>
  );
};

export default RecentListing;
