import React from "react";
import Header from "../../components/header/Header";
import {
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
  SectionFive,
  FAQSection,
  TrustedBy,
  Footer
} from "../../components/landingPageComponents/index";

const LandingPage = () => {
  return (
    <div className="font-inter overflow-x-hidden">
      <div className="">
        <Header />
      </div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <FAQSection />
      <TrustedBy />
      <Footer />
    </div>
  );
};

export default LandingPage;
