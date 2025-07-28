import React from 'react';
import AboutImage from "../../../public/img/about.png"
const AboutUs = () => {
  return (
    <>
      <div className="relative bg-[#1C3988] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Global Properties
            </h1>
            <p className="text-xl opacity-90">
              Your trusted partner in global real estate investments since 2010
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10 hidden md:block">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')`,
            }}
          ></div>
        </div>
      </div>
      {/* Our Story */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:gap-20">
          <div className="md:w-1/2">
            <img
              src={AboutImage}
              alt="Modern office building"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-600 mb-6">Our Story</h2>
            <p className="text-gray-600 t mb-4">
              Founded in 2010, Global Properties began with a vision to transform
              the international real estate landscape. What started as a small
              team of passionate professionals has grown into a worldwide network
              of property experts.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey has been defined by our commitment to excellence,
              integrity, and innovation. We've helped thousands of clients find
              their dream properties across six continents, building a reputation
              for trustworthiness and exceptional service.
            </p>
            <p className="text-gray-600">
              Today, Global Properties stands as an industry leader, continuously
              evolving to meet the changing needs of our global clientele while
              maintaining the personal touch that has defined us from the
              beginning.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;