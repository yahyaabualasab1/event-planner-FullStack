import type { AdminAuthPayload } from "./admin-auth.interface";

declare global {
	namespace Express {
		interface Request {
			admin?: AdminAuthPayload;
		}
	}
}

export {};