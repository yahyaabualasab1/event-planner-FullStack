import { mockVenueListings } from "../mocks/venue-listings";
import { useState } from "react";

export const listingsSearch = () => {
  const fakeListings = mockVenueListings;
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filtered = fakeListings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={onChangeHandler}
        value={searchTerm}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{listing.title}</h3>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-gray-800 font-bold mt-2">
                ${listing.price}/hr
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
