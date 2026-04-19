import mongoose, { Schema } from "mongoose";
import { Gender } from "../enums/customer-gender.enum";
import { ICustomer } from "../interfaces/Customer.interface";

const CustomerSchema = new Schema<ICustomer>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true }, 
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: {
      type: String,
      enum: Object.values(Gender)
     
    },
    dob: { type: Date },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
