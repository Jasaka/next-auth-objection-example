import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { ObjectionAdapter } from "@/backend/model/adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.PROVIDER_ID as string,
      clientSecret: process.env.PROVIDER_SECRET as string,
    }),
  ],
  adapter: ObjectionAdapter(),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
