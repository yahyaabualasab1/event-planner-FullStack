import { GenderEnum } from "../enums/models/gender.enum.ts";

export interface ICustomer {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  gender?: GenderEnum;
  dob?: Date;
  city: string;
}
