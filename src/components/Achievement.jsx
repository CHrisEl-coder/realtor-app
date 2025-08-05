import React from "react";
import { FaPlus } from "react-icons/fa";
import curly from "../assets/curly.jpg";
import hp from "../assets/headphone.jpg";
import pat from "../assets/pat.jpg";
import { MdHome } from "react-icons/md";
import side from "../assets/sidehouse.jpg";
import abstract from "../assets/side.png";

const Achievement = () => {
  return (
    <section className="relative max-w-5xl mx-auto mt-4 mb-4">
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="relative bg-gray-200 h-32 rounded-xl flex flex-col justify-center px-4 ">
          <h3 className="text-neutral-800 text-2xl font-mono font-medium flex gap-2 items-center">
            450 <FaPlus size={16} />
          </h3>
          <p className="text-neutral-800 text-sm font-sans font-normal">
            Satisfied Cutomers{" "}
          </p>
          <figure className="absolute top-4 right-8 w-7 h-7 overflow-hidden rounded-full border-2 border-neutral-300">
            <img
              src={curly}
              alt="Customerpic"
              className="object-cover w-full h-full"
            />
          </figure>
          <figure className="absolute top-12 right-2 w-7 h-7 overflow-hidden rounded-full border-2 border-neutral-300">
            <img
              src={pat}
              alt="Customerpic"
              className="object-cover w-full h-full"
            />
          </figure>
          <figure className="absolute bottom-4 right-8 w-7 h-7 overflow-hidden rounded-full border-2 border-neutral-300">
            <img
              src={hp}
              alt="Customerpic"
              className="object-cover w-full h-full"
            />
          </figure>
        </div>
        <div
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${side}) center/cover no-repeat`,
          }}
          className=" h-32 rounded-xl flex flex-col justify-center px-4 "
        >
          <h3 className="text-white text-2xl font-mono font-medium flex gap-2 items-center">
            300 <FaPlus size={16} />
          </h3>
          <p className="text-white text-sm font-sans font-normal">
            Rented Properties{" "}
          </p>
        </div>
        <div className=" relative bg-gray-200 h-32 rounded-xl flex flex-col justify-center px-4 ">
          <h3 className="text-neutral-800 text-2xl font-mono font-medium flex gap-2 items-center">
            5000 <FaPlus size={16} />
          </h3>
          <p className="text-neutral-800 text-sm font-sans font-normal">
            Allocated Home Owners{" "}
          </p>
          <p className="absolute top-8 right-4 p-2 rounded-full bg-neutral-300">
            <MdHome size={25} className="text-neutral-500" />
          </p>
        </div>
        <div
          style={{
            background: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${abstract}) center/cover no-repeat`,
          }}
          className=" h-32 rounded-xl flex flex-col justify-center px-4 "
        >
          <h3 className="text-white text-2xl font-mono font-medium flex gap-2 items-center">
            25 <FaPlus />
          </h3>
          <p className="text-sm text-white font-sans font-normal">
            Market Experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
