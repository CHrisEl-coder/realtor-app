import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { MdMapsHomeWork } from "react-icons/md";
import ListingTab from "../components/ListingTab";
import Loader from "../components/Loader";

export default function Profile() {
  const auth = getAuth();

  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [listings, setlistings] = useState(null);

  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    userId: auth.currentUser.uid,
  });

  const { name, email, userId } = user;

  const LogOut = () => {
    auth.signOut();
    toast.success(" Logged Out ");
    navigate("/");
  };

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    try {
      // check if any changes was made to name

      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update the firestore database
        const userRef = doc(db, "users", auth.currentUser.uid);

        await updateDoc(userRef, {
          first: name.split(" ")[0],
          last: name.split(" ")[1],
        });

        toast.success("Update successfull");
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  useEffect(() => {
    const listinguserData = async () => {
      const collectionRef = collection(db, "listings");
      const q = query(
        collectionRef,
        where("userRef", "==", userId),
        orderBy("timeStamp", "desc")
      );

      const querSnapshot = await getDocs(q);

      let listing = [];

      querSnapshot.forEach((doc) => {
        listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setlistings(listing);
      setIsLoading(false);
    };

    listinguserData();
  }, [userId]);

  const handleDeleteSuccess = (id) => {
    setlistings((prevData) => {
      return prevData.filter((listing) => listing.id !== id);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex flex-col gap-2 justify-center items-center py-4 ">
        <h1 className=" font-bold text-3xl">My Profile</h1>

        <div className=" w-full md:w-[50%] mt-6 px-3 ">
          <form className=" flex flex-col gap-4 ">
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetails}
              onChange={handleChange}
              className={`text-gray-600 w-full ring-1 ring-slate-300 p-3 rounded-md bg-white text-sm ${
                changeDetails && " bg-amber-500 focus:bg-amber-600"
              }`}
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className=" text-gray-600 w-full ring-1 ring-slate-300 p-3 rounded-md bg-white text-sm"
            />

            <div className=" flex justify-between font-semibold">
              <p className=" whitespace-nowrap items-center text-xs md:text-sm">
                Do you want to change your name ?{" "}
                <span
                  onClick={() => {
                    changeDetails && onSubmit();

                    setChangeDetails((prevState) => !prevState);
                  }}
                  className=" text-red-600 font-bold cursor-pointer hover:text-red-700 transition-colors duration-300 ease-out"
                >
                  {changeDetails ? "Submit Changes" : " Edit "}
                </span>
              </p>

              <p
                onClick={LogOut}
                className=" whitespace-nowrap text-amber-600 font-bold hover:text-amber-800 cursor-pointer transition-colors duration-200 ease-in-out text-xs md:text-sm"
              >
                {" "}
                Sign-Out{" "}
              </p>
            </div>
          </form>
          <button className=" w-full mt-4">
            <Link
              to="/create-listing"
              className="flex items-center justify-center gap-2 mt-4 bg-white  border border-slate-300 rounded-md p-3 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 ease-in-out"
            >
              <MdMapsHomeWork className=" text-amber-600 hover:text-amber-800 transition-colors duration-200 ease-in-out text-2xl" />
              <p className=" font-semibold"> Sell or Rent your homes</p>
            </Link>
          </button>
        </div>
      </section>

      {!isLoading && (
        <div className="max-w-6xl mx-auto py-4 px-4 space-y-4 flex flex-col justify-center items-center">
          <h1 className="font-bold font-sans text-lg">My Listings</h1>
          <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-center gap-4 px-3">
            {listings.map((listing) => (
              <ListingTab
                listing={listing.data}
                key={listing.id}
                id={listing.id}
                onDelete={handleDeleteSuccess}
                userId={userId}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
