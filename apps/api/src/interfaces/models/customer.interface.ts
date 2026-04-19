import { GenderEnum } from "../enums/models/customer-gender.enum";

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
