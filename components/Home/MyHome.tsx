import React from "react";
import Hero from "./Hero";
import Gallery from "../Gallery/Gallery";
import Showcase from "./showcase";

const MyHome = () => {
  return (
    <div className=" h-full  border-lime-800">
      <Hero />
      <Showcase />
    </div>
  );
};
export default MyHome;
