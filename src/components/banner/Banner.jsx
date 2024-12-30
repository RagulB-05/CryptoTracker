import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="bg-[url('/banner.jpg')] bg-cover bg-center h-96 content-center">
      <div className=" m-auto ">
        <h1 className="flex justify-center font-bold text-white text-6xl mx-5  ">
          Crypto Tracker
        </h1>
        <p className="flex justify-center text-gray-500 pt-3 mx-5">
          Get All The Info Regarding Your Favorite Crypto Currency
        </p>
        <Carousel />
      </div>
    </div>
  );
};

export default Banner;
