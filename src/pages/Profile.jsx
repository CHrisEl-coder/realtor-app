import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const auth = getAuth();

  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);

  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = user;

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
        </div>
      </section>
    </>
  );
}
