import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import Upcoming from "../Components/Upcoming";
import { Helmet } from "react-helmet-async";
const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("/event.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="space-y-20">
      <Helmet>
        <title>EventLy | Home</title>
      </Helmet>
      <Hero events={events} />

      <Upcoming events={events} />
    </div>
  );
};

export default Home;
