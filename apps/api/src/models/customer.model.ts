import mongoose, { Schema } from "mongoose";
import { GenderEnum } from "../enums/models/gender.enum.ts";
import { ICustomer } from "../interfaces/models/Customer.interface";

const CustomerSchema = new Schema<ICustomer>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true }, 
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: {
      type: String,
      enum: Object.values(GenderEnum)
     
    },
    dob: { type: Date },
    city: { type: String, required: true },
  },
  { timestamps: true },
  {collection:"Customers"},
);

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
