import React from "react";
import FeatureBlock from "./FeatureBlock";
import { features } from ".";



const SectionThree = () => {
  return (
    <section className="w-full px-6 md:px-16 py-10 bg-gray-50 font-inter z-20">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-textPrimary mb-8 md:mb-12">
        Track your Restaurant's insights
      </h2>

      {features.map((feature, index) => (
        <FeatureBlock
          key={index}
          {...feature}
          reverse={index % 2 !== 0} 
        />
      ))}
    </section>
  );
};

export default SectionThree;
