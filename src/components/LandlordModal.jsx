import React from "react";
import { MdCancel } from "react-icons/md";

const LandlordModal = ({ close }) => {
  return (
    <section className="fixed top-0 w-full h-full flex flex-col justify-center items-center bg-black/50 z-[9999]">
      <div className="relative bg-neutral-100 rounded max-w-4xl shadow-md px-4 py-4">
        <div className="flex flex-col items-end text-neutral-600 mb-2">
          <MdCancel onClick={() => close(false)} className="cursor-pointer" />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 bg-white">
          <form className="flex-1 flex flex-col gap-4 items-start w-[400px] px-2">
            <article className="flex flex-col items-start gap-1 w-full">
              <label className="text-neutral-500 text-xs font-medium">
                {" "}
                Name:{" "}
              </label>
              <input
                type="text"
                id="name"
                placeholder="enter your name"
                className="w-full outline-none  rounded p-2 shadow-md hover:shadow-lg focus:shadow-lg"
              />
            </article>
            <article className="flex flex-col items-start gap-1 w-full">
              <label className="text-neutral-500 text-xs font-medium">
                {" "}
                Tel:{" "}
              </label>
              <input
                type="text"
                id="number"
                placeholder="enter your number"
                className="w-full outline-none  rounded p-2 shadow-md hover:shadow-lg focus:shadow-lg"
              />
            </article>
            <textarea
              id="message"
              placeholder="enter message"
              className="w-full outline-none  rounded p-2 shadow-md hover:shadow-lg focus:shadow-lg"
            />
            <button
              type="submit"
              className="text-center py-2 rounded bg-teal-600 w-full text-white font-sans font-medium hover:bg-teal-700 transition-colors duration-200 ease-in-out"
            >
              Send Message
            </button>
          </form>
          <div className="relative md:w-[200px] bg-amber-600 rounded-e-lg">
            <div className="absolute hidden md:flex top-10 -left-5 bg-teal-900 flex-col justify-center items-start overflow-hidden gap-4 px-2 w-2/3 h-auto rounded-e-lg py-10">
              <article className="flex gap-2 text-[.65rem] text-amber-100">
                <p>Owner: </p>
                <p className=" whitespace-nowrap truncate">Gaahad Shavan</p>
              </article>
              <article className="flex gap-2 text-[.65rem] text-amber-100">
                <p className="whitespace-nowrap">Property: </p>
                <p className=" whitespace-nowrap truncate">Gaahad Shavan</p>
              </article>
              <article className="flex gap-2 text-[.65rem] text-amber-100">
                <p>Price: </p>
                <p className=" whitespace-nowrap truncate">Gaahad Shavan</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandlordModal;
