export  ICustomer {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  gender?: "male" | "female";
  dob?: Date;
  city: string;
}
