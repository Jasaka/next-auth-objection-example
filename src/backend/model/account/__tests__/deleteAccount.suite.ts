import User from "../../../../../knex/models/User";
import Account from "../../../../../knex/models/Account";
import { generateEmail, generateUuid } from "../../../../__test__/testUtils";
import insertUser from "../../user/queries/insertUser";
import deleteAccountByProviderAccountId from "../queries/deleteAccountByProviderAccountId";
import insertAccount from "../queries/insertAccount";

export const deleteAccountTests = () =>
  describe("Delete Account", () => {
    let user: User | undefined = undefined;
    let account: Account | null = null;
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });
      expect(user).toBeDefined();
      if (!user) return;
      account = await insertAccount({
        provider: "Mock Provider",
        providerAccountId: "Mock Provider Account Id",
        userId: user.id,
        type: "oauth",
      });
    });

    test("Deleting an Account returns true", async () => {
      expect(user).toBeDefined();
      if (!user) return;
      expect(account).toBeDefined();
      if (!account) return;

      const deletedAccount = await deleteAccountByProviderAccountId(
        account.providerAccountId,
        account.provider
      );

      expect(deletedAccount).toStrictEqual(account);
    });

    test("Deleting an Account with an invalid accountId throws a NotFoundError", async () => {
      const wrondDeletedAccount = await deleteAccountByProviderAccountId(
        generateUuid(),
        generateUuid()
      );
      expect(wrondDeletedAccount).toBeUndefined();
    });
  });
