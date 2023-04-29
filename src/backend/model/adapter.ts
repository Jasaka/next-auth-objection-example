import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from "next-auth/adapters";
import insertUser from "@/backend/model/user/queries/insertUser";
import getUserByUserId from "@/backend/model/user/queries/getUserByUserId";
import getUserByEmail from "@/backend/model/user/queries/getUserByEmail";
import getUserByProviderAndProviderAccountId from "@/backend/model/user/queries/getUserByProviderAndProviderAccountId";
import updateUser from "@/backend/model/user/queries/updateUser";
import deleteUserByUserId from "@/backend/model/user/queries/deleteUserByUserId";
import insertAccount from "@/backend/model/account/queries/insertAccount";
import getSessionByToken from "@/backend/model/session/queries/getSessionByToken";
import insertSession from "@/backend/model/session/queries/insertSession";
import updateSessionByToken from "@/backend/model/session/queries/updateSessionByToken";
import deleteSessionByToken from "@/backend/model/session/queries/deleteSessionByToken";
import deleteAccountByProviderAccountId from "@/backend/model/account/queries/deleteAccountByProviderAccountId";
import insertVerificationToken from "@/backend/model/verificationToken/queries/insertVerificationToken";
import getAndDeleteVerificationToken from "@/backend/model/verificationToken/queries/getAndDeleteVerificationToken";

/** @return { import("next-auth/adapters").Adapter } */
export function ObjectionAdapter(): Adapter {
  return {
    createUser(data) {
      return insertUser(data) as unknown as Promise<AdapterUser>;
    },
    getUser(id) {
      return getUserByUserId(id) as unknown as Promise<AdapterUser>;
    },
    getUserByEmail(email) {
      return getUserByEmail(email) as unknown as Promise<AdapterUser>;
    },
    getUserByAccount({ providerAccountId, provider }) {
      return getUserByProviderAndProviderAccountId(
        providerAccountId,
        provider
      ) as unknown as Promise<AdapterUser>;
    },
    updateUser(user) {
      return updateUser(user) as unknown as Promise<AdapterUser>;
    },
    deleteUser(userId) {
      return deleteUserByUserId(userId) as unknown as Promise<AdapterUser>;
    },
    linkAccount(account) {
      return insertAccount(account) as unknown as Promise<AdapterAccount>;
    },
    unlinkAccount({ providerAccountId, provider }) {
      return deleteAccountByProviderAccountId(
        providerAccountId,
        provider
      ) as unknown as Promise<AdapterAccount>;
    },
    createSession({ sessionToken, userId, expires }) {
      return insertSession({
        expires,
        sessionToken,
        userId,
      }) as unknown as Promise<AdapterSession>;
    },
    async getSessionAndUser(sessionToken) {
      const session = await getSessionByToken(sessionToken);
      if (!session) {
        return null;
      }
      const user = await getUserByUserId(session.userId);
      if (!user) {
        return null;
      }
      return { session, user } as unknown as {
        session: AdapterSession;
        user: AdapterUser;
      };
    },
    updateSession(data) {
      return updateSessionByToken(data) as unknown as Promise<AdapterSession>;
    },
    deleteSession(sessionToken) {
      return deleteSessionByToken(
        sessionToken
      ) as unknown as Promise<AdapterSession>;
    },
    createVerificationToken({ identifier, expires, token }) {
      return insertVerificationToken({
        expires: new Date(expires).toDateString(),
        identifier,
        token,
      });
    },
    useVerificationToken({ identifier, token }) {
      return (
        getAndDeleteVerificationToken({
          identifier,
          token,
        }) || null
      );
    },
  };
}
