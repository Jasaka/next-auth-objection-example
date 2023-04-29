import {
  generateUuid,
  getTimestampPlusMinutes,
} from "../../../../__test__/testUtils";
import insertVerificationToken from "../queries/insertVerificationToken";
import getAndDeleteVerificationToken from "../queries/getAndDeleteVerificationToken";
import { VerificationToken } from "next-auth/adapters";

export function deleteVerificationTokenTests() {
  describe("Get VerificationToken", () => {
    let verificationToken: VerificationToken;
    beforeAll(async () => {
      verificationToken = await insertVerificationToken({
        expires: getTimestampPlusMinutes(60).toDateString(),
        identifier: generateUuid(),
        token: generateUuid(),
      });
    });

    test("Deleting a VerificationToken returns the VerificationToken", async () => {
      expect(verificationToken).toBeDefined();
      if (!verificationToken) return;

      const deletedVerificationToken = await getAndDeleteVerificationToken({
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      });
      expect(deletedVerificationToken).toStrictEqual(verificationToken);
    });

    test("Trying to delete a VerificationToken while providing a wrong token returns undefined", async () => {
      const deletedVerificationToken = await getAndDeleteVerificationToken({
        identifier: generateUuid(),
        token: generateUuid(),
      });
      expect(deletedVerificationToken).toBeUndefined();
    });
  });
}
