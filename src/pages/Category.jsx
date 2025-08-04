import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { MapShow } from "../components/MapShow";
import {
  MdLocationOn,
  MdOutlineBathtub,
  MdOutlineSingleBed,
  MdOutlineGarage,
  MdOutlineChair,
  MdOutlineAccessTime,
  MdOutlinePerson,
} from "react-icons/md";
import { GiHouseKeys } from "react-icons/gi";
import { formatCurrency } from "../utils";
import Moment from "react-moment";
import LandlordModal from "../components/LandlordModal";

const Category = () => {
  // Fetch category data with the Id from URL params
  const params = useParams();

  const { Id, type } = params;

  const [listing, setListing] = useState(null);
  const [showContact, setShowContact] = useState(false);

  const onClose = (status) => {
    setShowContact(status);
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!Id) {
        throw new Error("Invalid parameters");
      }

      try {
        const docRef = doc(db, "listings", Id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          toast.error("Listing does not exist");
          console.error("No such document");
        }

        const data = docSnap.data();

        setListing(data);
      } catch (error) {
        console.error("Error fetching listing: ", error.message || error);
        toast.error("Error fetching data, please try again later.");
      }
    };

    fetchCategoryData();
  }, [Id]);

  return (
    <main className="relative">
      <div className="w-full">
        <Swiper
          modules={[Pagination, Navigation, EffectFade, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={2000}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
        >
          {listing &&
            listing.imageUrls &&
            listing.imageUrls.length > 0 &&
            listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-full h-[300px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {listing ? (
        <section className="max-w-6xl mx-auto px-4 py-8 shadow-lg shadow-gray-800/50 rounded bg-neutral-50 mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl text-neutral-800 font-sans font-bold ">
                {listing.name}
              </h1>
              <p className="flex items-center text-neutral-900/90 text-[.8rem] gap-1 font-medium">
                <MdLocationOn className="text-red-800" />
                {listing.address}
              </p>
            </div>

            <p className="flex flex-col items-end gap-1 text-2xl text-teal-800 font-sans font-bold">
              {listing.offer
                ? `${formatCurrency(listing.discountedPrice)} \n / month`
                : formatCurrency(listing.regularPrice)}
              <sub className="flex gap-1 items-center text-xs text-neutral-500 font-sans font-normal">
                <MdOutlineAccessTime />
                Listed <Moment fromNow>{listing.timeStamp.toDate()}</Moment>
              </sub>
            </p>
          </div>
          <div className="flex">
            <div className="relative flex-1">
              <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
                <article className="flex gap-2 items-center">
                  <p className="bg-neutral-200/100 p-2 rounded-full text-neutral-500 w-fit shadow-md shadow-neutral-400">
                    <MdOutlineSingleBed />
                  </p>
                  <p className=" bg-neutral-200/100 p-2 rounded-lg text-teal-500 text-[.6rem] font-medium">
                    {listing.bedroom > 1
                      ? `${listing.bedroom} Bedrooms`
                      : "1 Bedroom"}
                  </p>
                </article>
                <article className="flex gap-2 items-center">
                  <p className="bg-neutral-200/100 p-2 rounded-full text-neutral-500 w-fit shadow-md shadow-neutral-400">
                    <MdOutlineBathtub />
                  </p>
                  <p className=" bg-neutral-200/100 p-2 rounded-lg text-teal-500 text-[.6rem] font-medium">
                    {listing.bathroom > 1
                      ? `${listing.bathroom} Bathroom`
                      : "1 Bathroom"}
                  </p>
                </article>
                <article className="flex gap-2 items-center">
                  <p className="bg-neutral-200/100 p-2 rounded-full text-neutral-500 w-fit shadow-md shadow-neutral-400">
                    <MdOutlineChair />
                  </p>
                  <p className=" bg-neutral-200/100 p-2 rounded-lg text-teal-500 text-[.6rem] font-medium">
                    {listing.furnished ? `Furnished` : "Not Furmished"}
                  </p>
                </article>
                <article className="flex gap-2 items-center">
                  <p className="bg-neutral-200/100 p-2 rounded-full text-neutral-500 w-fit shadow-md shadow-neutral-400">
                    <MdOutlineGarage />
                  </p>
                  <p className=" bg-neutral-200/100 p-2 rounded-lg text-teal-500 text-[.6rem] font-medium">
                    {listing.parking ? `Parking Space` : "No Parking Space"}
                  </p>
                </article>
              </div>

              <article className="mt-4">
                <h2 className="text-xl font-sans font-medium border-b border-neutral-300 pb-2 mb-2">
                  Description
                </h2>
                <p className="text-neutral-500 text-[.8rem] font-sans">
                  {listing.description}
                </p>
              </article>
              <div className="flex gap-4 items-start mt-4 md:mt-14">
                <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors duration-300 ease-in-out shadow-md">
                  <GiHouseKeys /> {type === "rent" ? "Rent" : "Buy"} property
                </button>
                <button
                  className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300 ease-in-out last:shadow-md"
                  onClick={() => {
                    setShowContact(true);
                  }}
                >
                  <MdOutlinePerson /> Contact Owner
                </button>
              </div>
            </div>
            <MapShow
              lat={listing?.geometry?.ltd}
              lng={listing?.geometry?.lng}
              address={listing?.address}
            />
          </div>
        </section>
      ) : (
        <p className="flex justify-center items-center font-medium font-sans text-neutra dsl-900/50 text-xl">
          {" "}
          Loading ...
        </p>
      )}
      {showContact && <LandlordModal close={onClose} />}
    </main>
  );
};

export default Category;
