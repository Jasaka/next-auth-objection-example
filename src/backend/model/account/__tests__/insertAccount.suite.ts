import User from "../../../../../knex/models/User";
import insertUser from "../../user/queries/insertUser";
import { generateEmail, generateUuid } from "../../../../__test__/testUtils";
import insertAccount from "../queries/insertAccount";
import { ForeignKeyViolationError } from "objection";

export const insertAccountTests = () =>
  describe("Insert Account", () => {
    let user: User | undefined = undefined;
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });
    });

    test("Inserting an Account returns the new Account", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      const providerAccountId = generateUuid();

      const account = await insertAccount({
        provider: "Mock Provider",
        providerAccountId: providerAccountId,
        userId: user.id,
        type: "oauth",
      });

      expect(account.providerAccountId).toBe(providerAccountId);
    });

    test("Inserting an Account with an invalid userId throws a ForeignKeyViolationError", async () => {
      await expect(
        insertAccount({
          provider: "Mock Provider",
          providerAccountId: generateUuid(),
          userId: generateUuid(),
          type: "oauth",
        })
      ).rejects.toThrow(ForeignKeyViolationError);
    });
  });
