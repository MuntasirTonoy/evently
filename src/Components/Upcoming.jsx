import React from "react";
import EventCard from "./EventCard";

const Upcoming = ({ events }) => {
  return (
    <div className="mb-20">
      <h1 className="text-3xl font-semibold text-gray-700 mb-8 text-center">
        {events.length} Upcoming events
      </h1>

      <div className="grid grid-cols-1 w-full lg:w-4/5 mx-auto md:grid-cols-2 lg:grid-cols-3 px-10 gap-10">
        {" "}
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
