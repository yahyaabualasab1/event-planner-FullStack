import { Types } from "mongoose";

export interface IAvailability {
  from: string;
  to: string;
}

export interface IVenue {
  id: string;
  clientId: string;
  title: string;
  description: string;
  location: string;
  price: string;
  images: string[];
  extras: string;
  availability: IAvailability[];
  discounts?: string;
}
