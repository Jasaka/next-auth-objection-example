import insertUser from "../../user/queries/insertUser";
import {
  generateEmail,
  generateUuid,
  getTimestampPlusDays,
} from "../../../../__test__/testUtils";
import User from "../../../../../knex/models/User";
import insertSession from "../queries/insertSession";

export function insertSessionTests() {
  describe("Insert Session", () => {
    let user: User | undefined;
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });
    });

    test("Inserting a Session returns the new Session including the userId", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      const session = await insertSession({
        expires: getTimestampPlusDays(1),
        sessionToken: generateUuid(),
        userId: user.id,
      });

      expect(session.userId).toBe(user.id);
    });

    test("Inserting a Session without providing a valid userId throws an error", async () => {
      await expect(
        insertSession({
          expires: getTimestampPlusDays(1),
          sessionToken: generateUuid(),
          userId: generateUuid(),
        })
      ).rejects.toThrow();
    });
  });
}
