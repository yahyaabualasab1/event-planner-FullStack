import type { AdminAuthPayload } from "./admin-auth.interface";
import type { CustomerAuthPayload } from "./customer-auth.interface";

declare global {
	namespace Express {
		interface Request {
			admin?: AdminAuthPayload;
			customer?: CustomerAuthPayload;
		}
	}
}

export {};