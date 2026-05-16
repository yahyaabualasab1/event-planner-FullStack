import { Schema, model } from "mongoose";
import { IVenue } from "../interfaces/models/venue.interface";

const availabilitySchema = new Schema<{ from: string; to: string }>(
  {
    from: { type: String },
    to: { type: String },
  },
  { _id: false },
);

const venueSchema = new Schema<IVenue>(
  {
    clientId: { type: String, required: true, ref: "Client" },
    title: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String, required: false },
    capacity: { type: Number, required: false },
    price: { type: String, required: false },
    images: { type: [String], required: false },
    extras: { type: String, required: false },
    availability: { type: [availabilitySchema], required: false },
    discounts: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { collection: "venues" },
);

export const Venue = model("Venue", venueSchema);
export { venueSchema };
