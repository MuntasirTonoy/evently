import React from "react";
import {
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  DollarSignIcon,
} from "lucide-react";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  const { id, event_name, thumbnail, category, date, location, fee } = event;
  return (
    <div className="bg-white rounded-lg border-1 border-gray-800/20 overflow-hidden cursor-pointer">
      <img src={thumbnail} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center mb-2 ">
          <TagIcon className="w-4 h-4 text-indigo-600 mr-1" />
          <span className="text-sm text-indigo-600">{category}</span>
        </div>
        <h3 className="text-xl line-clamp-1 font-semibold mb-2">
          {event_name}
        </h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center h-8 text-gray-600">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span className="text-sm ">{location}</span>
          </div>
          <div className="flex items-center gap-0 text-gray-600">
            <DollarSignIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{fee}</span>
          </div>
        </div>
        <Link
          to={`/event-details/${id}`}
          className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          View More
        </Link>
      </div>
    </div>
  );
};
export default EventCard;
