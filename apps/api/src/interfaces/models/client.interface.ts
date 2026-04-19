import { ActorEnum } from "../../enums/models/actor";
import { ClientStatus } from "../../enums/models/client";

export interface IClient {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  status: ClientStatus;
}
