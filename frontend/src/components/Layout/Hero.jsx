import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-white">
      <div className="max-w-[1800px] mx-auto">
        <img
          src={heroImg}
          alt="Rabbit"
          className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase mb-6 leading-tight">
              Vacation <br className="hidden md:block" /> Ready
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-lg mx-auto font-light tracking-normal">
              Explore our premium vacation outfits with worldwide express shipping.
            </p>
            <Link
              to="#"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors duration-300 border border-white/20 hover:border-white/30 shadow-sm hover:shadow-md"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;