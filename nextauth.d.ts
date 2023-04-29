// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    organization: string;
    azureId: string;
    roles: string[];
  }
  interface Session {
    user: User;
  }
}
