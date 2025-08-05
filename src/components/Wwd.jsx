import React from "react";
import structture from "../assets/structure.jpg";

const Wwd = () => {
  return (
    <section
      className="max-w-6xl h-[400px] mx-auto flex flex-col justify-center rounded-lg"
      style={{
        background: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(${structture}) center/cover no-repeat`,
      }}
    >
      <div className=" max-w-lg px-8">
        <h2 className="text-xl text-amber-600 font-sans font-medium">
          What we offer
        </h2>
        <p className="text-xs text-white font-sans font-normal mt-2 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          inventore, labore quo libero laudantium, doloribus maxime tenetur
          aspernatur eligendi autem deserunt facilis? Saepe illum iste, quis
          aliquid nostrum et doloribus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quo eveniet dolorum repellat laborum maiores nulla
          quasi, deserunt illo id inventore animi quod fugiat totam itaque. At
          officiis eaque amet exercitationem.
        </p>
        <form className="flex items-center gap-2 mt-4">
          <input
            type="text"
            name="news"
            id="news"
            placeholder="Subscribe to newsletter"
            className="w-full outline-none shadow-md rounded px-4 py-2"
          />
          <button className="py-2 px-4 bg-amber-600 text-white text-sm font-sans font-medium hover:bg-amber-700 transition-colors duration-200 ease-in-out">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Wwd;
