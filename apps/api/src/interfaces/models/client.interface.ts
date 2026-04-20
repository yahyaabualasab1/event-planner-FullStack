import { ClientStatus } from "../../enums/models/client.status";

export interface IClient {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  status: ClientStatus;
}
