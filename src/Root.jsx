import React from "react";
import Navbar from "./Components/NavBar";
import Footer from "./Components/footer";
import { Outlet } from "react-router";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <Helmet>
        <title>EventLy | Home</title>
      </Helmet>
      <Navbar />
      <Toaster />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Root;
