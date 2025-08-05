import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./chris.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userState, setUserState] = useState(false);

  function locDesign(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(true);
      } else {
        setUserState(false);
      }
    });
  }, [userState]);

  return (
    <div className="bg-white border-b shadow-sm sticky z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src={logo}
            alt="Logo"
            className="h-20 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                locDesign("/") &&
                "text-[#00154077] border-b-[2px] border-b-[#e56717]"
              }`}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>

            <li
              className={`cursor-pointer py-3 font-semibold text-sm ${
                locDesign("/offers") &&
                "text-[#00154077] border-b-[2px] border-b-[#e56717]"
              }`}
              onClick={() => {
                navigate("/offers");
              }}
            >
              Offers
            </li>

            {userState ? (
              <li
                className={`cursor-pointer py-3 font-semibold text-sm  ${
                  locDesign("/profile") &&
                  "text-[#00154077] border-b-[2px] border-b-[#e56717]"
                }`}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </li>
            ) : (
              <li
                className={`cursor-pointer py-3 font-semibold text-sm  ${
                  locDesign("/sign-up") &&
                  "text-[#00154077] border-b-[2px] border-b-[#e56717]"
                }`}
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Register
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}
