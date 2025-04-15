import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export default function Oauth() {
  const navigate = useNavigate();
  const GoogleAuth = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithRedirect(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);

      // check if user already exists
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="bg-[#042703] py-2 px-16 rounded hover:bg-transparent hover:border-2 transition ease-in-out duration-300 flex items-center justify-center space-x-1"
      onClick={GoogleAuth}
    >
      <FcGoogle className="bg-white rounded-full" />
      <button className="font-semibold text-white" type="button">
        Continue With Google
      </button>
    </div>
  );
}
