import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTags,
} from "react-icons/fa";
import { PiUserCircleDuotone } from "react-icons/pi";
import { TbClockBolt } from "react-icons/tb";
import { useLoaderData, useParams } from "react-router";

const EventDetails = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const eventDetails = data.find((singleEvent) => singleEvent.id === id);
    setEvent(eventDetails);
  }, [id, data]);
  const {
    event_name,
    thumbnail,
    category,
    date,
    location,
    fee,
    capacity,
    description,
    ending_time,
    starting_time,
    organizer,
  } = event || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Event Details </title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-gray-900 mb-5 ">
        Event Details
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">
        <div className="lg:col-span-2 border-1 p-6 border-gray-800/20 rounded-md ">
          <div className="relative pt-[56.25%] overflow-hidden rounded-md mb-6">
            <img
              src={thumbnail}
              className="absolute top-0 left-0 w-full h-full object-cover"
              alt={event_name}
            />
          </div>
          <h1 className="text-3xl font-bold mt-6 mb-4">{event_name}</h1>
          <div className="grid grid-cols-2  gap-2 mb-6">
            <div className="flex items-center">
              <FaCalendarAlt className="w-5 h-5 mr-2 text-indigo-600" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 mr-2 text-indigo-600" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <FaTags className="w-5 h-5 mr-2 text-indigo-600" />
              <span>{category}</span>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="w-5 h-5 mr-2 text-indigo-600" />
              <span>${fee}</span>
            </div>
            <div className="flex items-center">
              <PiUserCircleDuotone className="w-5 h-5 mr-2 text-indigo-600" />
              <span>Capacity: {capacity}</span>
            </div>
            <div className="flex items-center">
              <TbClockBolt className="w-5 h-5 mr-2 text-indigo-600" />
              <span>
                {starting_time}- {ending_time}
              </span>
            </div>
          </div>
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-2">About the Event</h2>
            <p className="mb-6">{description}</p>
            <h2 className="text-xl font-semibold mb-2">Event Agenda</h2>
            <ul className="list-disc pl-5 mb-6">
              <li>9:00 AM - Registration and Breakfast</li>
              <li>10:00 AM - Keynote: Future of Technology</li>
              <li>11:30 AM - Workshop: Advanced React Patterns</li>
              <li>1:00 PM - Lunch Break</li>
              <li>2:00 PM - Panel Discussion: AI Ethics</li>
              <li>3:30 PM - Networking Session</li>
              <li>5:00 PM - Closing Remarks</li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border-1 border-gray-600/20">
            <h2 className="text-xl font-semibold mb-4">Reserve Your Seat</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Type your Name here"
                  className="input"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Type your Email"
                  className="input"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reserve Seat
              </button>
            </form>
          </div>
          <div className="mt-6 bg-white p-6 rounded-lg border-1 border-gray-800/20 ">
            <h2 className="text-xl font-semibold mb-4">Organizer</h2>
            <p className="text-gray-600">{organizer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
