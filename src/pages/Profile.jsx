import { useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function Profile() {
  const auth = getAuth();

  const navigate = useNavigate();

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
              disabled
              className=" text-gray-600 w-full ring-1 ring-slate-300 p-3 rounded-md bg-white text-sm "
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
                <span className=" text-red-600 font-bold cursor-pointer hover:text-red-700 transition-colors duration-300 ease-out">
                  {" "}
                  Edit{" "}
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
