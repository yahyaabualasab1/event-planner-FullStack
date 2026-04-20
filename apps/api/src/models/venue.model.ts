import { Schema, model } from "mongoose";
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
    clientId: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
    title: { type: String },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    price: { type: String, default: "" },
    images: { type: [String], default: [] },
    extras: { type: String },
    availability: { type: [availabilitySchema] },
    discounts: { type: String },
  },
  { collection: "venues" }
);

export const Venue = model("Venue", venueSchema);
export { venueSchema };