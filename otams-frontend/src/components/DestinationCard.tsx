import React from "react";
import { Link } from "react-router-dom";
import { Destination } from "../types/Destination";

interface Props {
  destination: Destination;
}

const DestinationCard: React.FC<Props> = ({ destination }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={destination.images && destination.images.length > 0 ? destination.images[0] : "/images/bg_img.jpg"}
        alt={destination.name}
        className="h-56 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{destination.name}</h3>
        <p className="text-gray-500">
          {destination.country}, {destination.city}
        </p>
        <Link to={`/destinations/${destination.id}`}>
          <button className="mt-4 bg-teal-500 px-4 py-2 rounded text-white hover:bg-teal-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
