import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    river_type?: string;
    river_id?: number;
    user_type?: string;
  }

  interface User {
    river_type?: string;
    river_id?: number;
    token?: string;
    user_type?: string;
  }
}
