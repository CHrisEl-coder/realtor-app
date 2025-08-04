import React from "react";
import logo from "./chris.png";
import { MdEmail } from "react-icons/md";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 px-2 rounded-t-xl overflow-hidden mt-4">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:place-items-center gap-4 px-4 py-2 rounded-md ">
        <div className=" flex flex-col gap-4 items-start">
          <figure className="relative w-20 h-20 bg-white/50 rounded-md ">
            <img src={logo} alt="logo" className="object-cover " />
          </figure>
          <article>
            <h3 className="text-base text-amber-600 font-semibold font-sans mb-2">
              About Us
            </h3>
            <p className="text-[.65rem] text-neutral-300 font-sans font-medium leading-tight">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloribus molestias libero, maiores nemo harum dolorem voluptate
              ipsa perspiciatis, eum repudiandae, cumque repellendus totam? Ipsa
              impedit error vel debitis officiis dicta!
            </p>
          </article>
          <article>
            <h3 className="text-base text-amber-600 font-medium font-sans mb-2">
              Contact Us
            </h3>
            <p className="text-[.65rem] font-medium text-neutral-300">
              +91 1234567890
            </p>
            <p className="text-[.65rem] text-neutral-300 font-medium">
              edwinchristian97@gmail
            </p>
          </article>
        </div>
        <div className="relative">
          <h3 className="text-base text-amber-600 font-semibold font-sans mb-2">
            Information
          </h3>
          <ul className=" flex flex-col items-start gap-2 text-[.65rem] text-neutral-300 font-sans font-medium">
            <li>About Us</li>
            <li>Blog</li>
            <li>More Search</li>
            <li>Testimonies</li>
            <li>Event</li>
          </ul>
        </div>
        <div className="relative ">
          <h3 className="text-base text-amber-600 font-sans font-semibold">
            Helpful Links
          </h3>
          <ul className="text-[.65rem] text-neutral-300 flex flex-col gap-2 items-start font-sans font-medium">
            <li>Services</li>
            <li></li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Support</li>
          </ul>
        </div>
        <div className="relative">
          <h3 className="text-sm text-neutral-300 font-sans font-semibold mb-2">
            Subscribe for more info
          </h3>
          <form className="flex flex-col gap-4 items-start">
            <div className="bg-white flex gap-1 items-center rounded shadow-md hover:shadow-lg py-2 px-2">
              <MdEmail className="text-neutral-700" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none text-neutral-600 placeholder:text-neutral-400 text-sm font-sans px-2 w-full"
              />
            </div>
            <button className="bg-amber-600 px-8 py-2 text-white text-sm rounded hover:bg-amber-600 transition-all duration-200 ease-in-out">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className=" w-full flex items-end justify-end border-t border-neutral-100 mt-4">
        <div className="flex justify-between items-end gap-8 w-full max-w-2xl mt-4 px-4 py-2">
          <ul className="flex items-center justify-center gap-4 mt-4">
            <li className="bg-amber-600 p-2 rounded-full hover:bg-amber-700 transition-colors duration-200">
              <FaTwitter className="text-white text-sm" />
            </li>
            <li className="bg-amber-600 p-2 rounded-full hover:bg-amber-700 transition-colors duration-200">
              <FaFacebookF className="text-white text-sm" />
            </li>
            <li className="bg-amber-600 p-2 rounded-full hover:bg-amber-700 transition-colors duration-200">
              <FaInstagram className="text-white text-sm" />
            </li>
            <li className="bg-amber-600 p-2 rounded-full hover:bg-amber-700 transition-colors duration-200">
              <FaLinkedinIn className="text-white text-sm" />
            </li>
          </ul>

          <p className="text-xs text-neutral-400 font-sans font-medium ">
            &copy; {new Date().getFullYear()} Chris Creatives. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
