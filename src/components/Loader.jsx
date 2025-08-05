import React from "react";
import load from "../assets/loading.svg";

function Loader() {
  return (
    <div className=" bg-[rgba(0,0,0,0.6)] w-full h-screen flex justify-center items-center z-50 fixed top-0 left-0 right-0 bottom-0">
      <div>
        <img src={load} alt="loader" />
      </div>
    </div>
  );
}

export default Loader;
