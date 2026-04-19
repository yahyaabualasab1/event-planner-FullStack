import { Types } from "mongoose";

export interface IClientProfileContactInformation {
	name: string;
	phone: string;
}

export interface IClientProfile {
	clientId: Types.ObjectId;
	address: string;
	description: string;
	mapURL: string;
	contactInformation: IClientProfileContactInformation;
	logo: string;
	coverImage: string;
}
