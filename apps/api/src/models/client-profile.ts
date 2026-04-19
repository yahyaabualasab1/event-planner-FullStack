import { Schema, model, type Model } from "mongoose";

import { IClientProfile } from "../interfaces/models/client-profile.interface";

const clientProfileSchema = new Schema<IClientProfile>(
	{
		clientId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Client",
		},
		address: { type: String, required: true },
		description: { type: String, required: true },
		mapURL: { type: String, required: true },
		contactInformation: {
			type: {
				name: { type: String, required: true },
				phone: { type: String, required: true },
			},
			required: true,
		},
		logo: { type: String, required: true },
		coverImage: { type: String, required: true },
	},
	{ collection: "clientProfiles" },
);

export const ClientProfile: Model<IClientProfile> = model<IClientProfile>(
	"ClientProfile",
	clientProfileSchema,
);

export { clientProfileSchema };
