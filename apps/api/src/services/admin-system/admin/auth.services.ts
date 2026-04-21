import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { ActorEnum } from "../../../enums/models/actor";
import { Admin } from "../../../models/admin.model";

type AdminTokenPayload = {
	id: string;
	email: string;
	actorType: ActorEnum;
};

function getAdminJwtSecret(): string {
	const secret = process.env.JWT_ADMIN_SECRET;
	if (!secret) {
		throw new Error("JWT_ADMIN_SECRET is missing in environment variables");
	}
	return secret;
}

export async function adminLogin(email: string, password: string) {
	const admin = await Admin.findOne({ email });

	if (!admin) {
		throw new Error("Invalid email or password");
	}

	const isPasswordValid = await compare(password, admin.password);
	if (!isPasswordValid) {
		throw new Error("Invalid email or password");
	}

	const payload: AdminTokenPayload = {
		id: admin._id.toString(),
		email: admin.email,
		actorType: ActorEnum.Admin,
	};

	const token = jwt.sign(payload, getAdminJwtSecret(), {
		expiresIn: "1d",
	});

	return {
		token,
		admin: {
			_id: admin._id.toString(),
			email: admin.email,
			fullName: admin.fullName,
			phoneNumber: admin.phoneNumber,
		},
	};
}

export function verifyAdminToken(token: string): AdminTokenPayload {
	const decoded = jwt.verify(token, getAdminJwtSecret()) as AdminTokenPayload;

	if (decoded.actorType !== ActorEnum.Admin) {
		throw new Error("Forbidden");
	}

	return decoded;
}
