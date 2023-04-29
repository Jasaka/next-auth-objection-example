import insertUser from "../../user/queries/insertUser";
import {
  generateEmail,
  generateUuid,
  getTimestampPlusDays,
  getTimestampPlusMinutes,
} from "../../../../__test__/testUtils";
import User from "../../../../../knex/models/User";
import insertSession from "../queries/insertSession";
import Session from "../../../../../knex/models/Session";
import updateSessionByToken from "../queries/updateSessionByToken";

export function updateSessionTests() {
  describe("Update Session", () => {
    let user: User | undefined;
    let session: Session;
    const originalSessionToken = generateUuid();
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });

      expect(user).toBeDefined();
      if (!user) return;

      session = await insertSession({
        sessionToken: originalSessionToken,
        userId: user.id,
        expires: getTimestampPlusDays(1),
      });
    });

    test("Updating a Session returns the updated session", async () => {
      const newExpires = getTimestampPlusMinutes(60);
      const updatedSession = await updateSessionByToken({
        sessionToken: session.sessionToken,
        expires: newExpires,
      });

      expect(updatedSession).toBeDefined();
      if (!updatedSession) return;

      expect(updatedSession).toBeDefined();
      if (!updatedSession) return;

      expect(updatedSession.sessionToken).toBe(originalSessionToken);
      expect(Date.parse(updatedSession.expires.toDateString())).toBe(
        Date.parse(newExpires.toDateString())
      );
    });
  });
}
