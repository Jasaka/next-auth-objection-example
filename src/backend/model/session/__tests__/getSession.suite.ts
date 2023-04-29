import insertUser from "../../user/queries/insertUser";
import {
  generateEmail,
  generateUuid,
  getTimestampPlusDays,
} from "../../../../__test__/testUtils";
import User from "../../../../../knex/models/User";
import insertSession from "../queries/insertSession";
import Session from "../../../../../knex/models/Session";
import getSessionByToken from "../queries/getSessionByToken";

export function getSessionTests() {
  describe("Get Session", () => {
    let user: User | undefined;
    let session: Session;
    const sessionToken = generateUuid();
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });

      expect(user).toBeDefined();
      if (!user) return;

      session = await insertSession({
        sessionToken,
        userId: user.id,
        expires: getTimestampPlusDays(1),
      });
    });

    test("Retrieving a Session returns the session", async () => {
      const retrievedSession = await getSessionByToken(sessionToken);

      expect(session.sessionToken).toBe(sessionToken);

      expect(retrievedSession).toBeDefined();
      if (!retrievedSession) return;

      expect(retrievedSession.sessionToken).toBe(sessionToken);
    });

    test("Trying to retrieve a non-existent Session throws an error", async () => {
      const nonExistingSession = await getSessionByToken(generateUuid());
      expect(nonExistingSession).toBeUndefined();
    });
  });
}
