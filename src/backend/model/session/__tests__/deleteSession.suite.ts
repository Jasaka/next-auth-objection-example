import insertUser from "../../user/queries/insertUser";
import {
  generateEmail,
  generateUuid,
  getTimestampPlusDays,
} from "../../../../__test__/testUtils";
import User from "../../../../../knex/models/User";
import insertSession from "../queries/insertSession";
import Session from "../../../../../knex/models/Session";
import deleteSessionByToken from "../queries/deleteSessionByToken";
import getSessionByToken from "../queries/getSessionByToken";
export function deleteSessionTests() {
  describe("Delete Session", () => {
    let user: User | undefined;
    let session: Session;
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });

      expect(user).toBeDefined();
      if (!user) return;

      session = await insertSession({
        sessionToken: generateUuid(),
        userId: user.id,
        expires: getTimestampPlusDays(1),
      });
    });

    test("Deleting a Session returns the session", async () => {
      const deletedSession = await deleteSessionByToken(session.sessionToken);

      expect(deletedSession).toStrictEqual(session);
    });

    test("Deleting a Session removes the session from the database", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      const newSession = await insertSession({
        sessionToken: generateUuid(),
        userId: user.id,
        expires: getTimestampPlusDays(1),
      });

      await deleteSessionByToken(newSession.sessionToken);
      const deletedSession = await getSessionByToken(newSession.sessionToken);
      expect(deletedSession).toBeUndefined();
    });

    test("Trying to delete a Session that doesn't exist throws an error", async () => {
      const deletedSession = await getSessionByToken(generateUuid());
      expect(deletedSession).toBeUndefined();
    });
  });
}
