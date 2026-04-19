import { Gender } from "../enums/customer-gender.enum";

export interface ICustomer {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  gender?: Gender;
  dob?: Date;
  city: string;
}
