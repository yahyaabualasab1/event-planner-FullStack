import { Schema, model, type Model } from "mongoose";

import { IVenue } from "../interfaces/models/venue.interface";

const availabilitySchema = new Schema<{ from: string; to: string }>(
  {
    from: { type: String },
    to: { type: String },
  },
  { _id: false }
);

const venueSchema = new Schema<IVenue>(
  {
    clientId: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    location: { type: String },
    price: { type: String },
    images: { type: [String] },
    extras: { type: String },
    availability: { type: [availabilitySchema] },
    discounts: { type: String },
  },
  { collection: "venues" }
);

export const Venue: Model<IVenue> = model<IVenue>("Venue", venueSchema);

export { venueSchema };