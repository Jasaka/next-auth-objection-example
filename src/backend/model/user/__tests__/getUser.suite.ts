import User from "../../../../../knex/models/User";
import Account from "../../../../../knex/models/Account";
import Session from "../../../../../knex/models/Session";
import insertUser from "../queries/insertUser";
import insertAccount from "../../account/queries/insertAccount";
import insertSession from "../../session/queries/insertSession";
import getUserByUserId from "../queries/getUserByUserId";
import getUserByEmail from "../queries/getUserByEmail";
import getUserByProviderAndProviderAccountId from "../queries/getUserByProviderAndProviderAccountId";
import getUserBySessionToken from "../queries/getUserBySessionToken";
import {
  generateEmail,
  generateUuid,
  getTimestampPlusMinutes,
} from "../../../../__test__/testUtils";

export const getUserTests = () =>
  describe("Get User", () => {
    let user: User | undefined = undefined;
    let account: Account | null = null;
    let session: Session | null = null;
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });
      if (!user) throw new Error("User not inserted");
      account = await insertAccount({
        provider: "Mock Provider",
        providerAccountId: generateUuid(),
        userId: user.id,
        type: "oauth",
      });
      if (!account) throw new Error("Account not inserted");
      session = await insertSession({
        expires: getTimestampPlusMinutes(360),
        sessionToken: generateUuid(),
        userId: user.id,
      });
    });

    test("Getting a User by id returns the user", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      const foundUser = await getUserByUserId(user.id);

      expect(foundUser?.email).toBe(user.email);
    });

    test("Getting a User by email returns the user", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      const foundUser = await getUserByEmail(user.email);

      expect(foundUser?.email).toBe(user.email);
    });

    test("Getting a User by Account returns the user", async () => {
      expect(user).toBeDefined();
      if (!user) return;
      expect(account).toBeDefined();
      if (!account) return;

      const foundUser = await getUserByProviderAndProviderAccountId(
        account.providerAccountId,
        account.provider
      );

      expect(foundUser?.email).toBe(user.email);
    });

    test("Getting a User by SessionToken returns the user", async () => {
      expect(user).toBeDefined();
      if (!user) return;
      expect(session).toBeDefined();
      if (!session) return;

      const foundUser = await getUserBySessionToken(session.sessionToken);

      expect(foundUser?.email).toBe(user.email);
    });
  });
