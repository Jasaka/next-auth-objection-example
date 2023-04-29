import insertVerificationToken from "../queries/insertVerificationToken";
import {
  generateUuid,
  getTimestampPlusMinutes,
} from "../../../../__test__/testUtils";

export function insertVerificationTokenTests() {
  describe("Insert VerificationToken", () => {
    test("Inserting a VerificationToken returns the new VerificationToken", async () => {
      const tokenIdenfier = generateUuid();
      const token = generateUuid();

      const verificationToken = await insertVerificationToken({
        expires: getTimestampPlusMinutes(60).toDateString(),
        identifier: tokenIdenfier,
        token: token,
      });

      expect(verificationToken).toBeDefined();
      expect(verificationToken.identifier).toBe(tokenIdenfier);
      expect(verificationToken.token).toBe(token);
    });
  });
}
