"use client";

import AboutUsScreen from "./AboutUs";
import ContactUsScreen from "./ContactUs";
import FooterScreen from "./Footer";
import HomePageHeader from "./Header";
import HeroBanner from "./HeroBanner";
import ServiceScreen from "./Service";

const HomePageScreen = () => {
  return (
    <>
      <HomePageHeader />
      <HeroBanner />
      <AboutUsScreen />
      <ServiceScreen />
      <ContactUsScreen />
      <FooterScreen />
    </>
  );
};

export default HomePageScreen;
