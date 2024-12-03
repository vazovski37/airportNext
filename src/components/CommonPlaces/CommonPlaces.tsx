import React from "react";
import Card from "../Card/Card";
import common1 from "../../assets/common1.png";
import common2 from "../../assets/common2.png";
import common3 from "../../assets/common3.png";

const places = [
  {
    image: common1,
    title: "წყალტუბო",
    description: "ყოველდღე 5-სთზე £10.99-დან",
  },
  {
    image: common2,
    title: "ტურიზმის ცენტრი",
    description: "ყოველდღე 7-სთზე £10.99-დან",
  },
  {
    image: common3,
    title: "გორის პარკი",
    description: "ყოველდღე 7-სთზე £15-დან",
  },
];

const CommonPlaces = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ხშირი მარშრუტები</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place, index) => (
          <Card
            key={index}
            image={place.image}
            title={place.title}
            description={place.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CommonPlaces;
