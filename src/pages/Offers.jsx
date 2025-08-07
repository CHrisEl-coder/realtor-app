import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ListingTab from "../components/ListingTab";
import { getAuth } from "firebase/auth";

export default function Offers() {
  const [loading, setLoading] = useState(true);
  const [offerListing, setOfferListing] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const handleDelete = (id) => {
    setOfferListing((prev) => {
      return prev.filter((listing) => listing.id !== id);
    });
  };

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const collectionRef = collection(db, "listings");
        const q = query(
          collectionRef,
          where("offer", "==", true),
          orderBy("timeStamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);

        const lastItem = querySnap.docs[querySnap.docs.length - 1];
        setLastFetched(lastItem);
        const fetchedListing = [];

        querySnap.forEach((doc) => {
          return fetchedListing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setOfferListing(fetchedListing);
        setLoading(false);
      } catch (err) {
        toast.error("Could not fetch listing, please try again later.");
        console.error("Error fecthing offer listing", err.message || err);
      }
    };

    fetchOfferListing();
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const collectionRef = collection(db, "listings");
      const q = query(
        collectionRef,
        where("offer", "==", true),
        orderBy("timeStamp", "desc"),
        startAfter(lastFetched),
        limit(4)
      );

      const querySnap = await getDocs(q);

      const lastItem = querySnap.docs[querySnap.docs.length - 1];

      setLastFetched(lastItem);

      const fetchedListing = [];
      querySnap.forEach((doc) => {
        return fetchedListing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setOfferListing((prev) => [...prev, ...fetchedListing]);
    } catch (err) {
      toast.error("Error fetching more listing, please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-sans font-bold mb-6">
        Offers
      </h1>
      {loading ? (
        <Loader />
      ) : offerListing && offerListing.length > 0 ? (
        <>
          <main className=" w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-center gap-4 px-2 py-4">
            {offerListing.map((listing) => (
              <ListingTab
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                userId={userId || ""}
                onDelete={handleDelete}
              />
            ))}
          </main>

          {lastFetched && (
            <button
              onClick={handleLoadMore}
              className="w-full py-2 text-neutral-600 font-medium fomt-sans text-sm border rounded border-neutral-300 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              {loading ? "Loading..." : "More"}
            </button>
          )}
        </>
      ) : (
        <p className="flex justify-center items-center text-base text-neutral-400 font-medium font-sans italic">
          No Current Offers
        </p>
      )}
    </div>
  );
}
