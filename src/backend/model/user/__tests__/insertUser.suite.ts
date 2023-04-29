import insertUser from "../queries/insertUser";
import { ValidationError } from "objection";
import { generateEmail } from "../../../../__test__/testUtils";

export const insertUserTests = () =>
  describe("Insert User", () => {
    test("Inserting a new User with email returns the new user", async () => {
      const testedEmail = generateEmail();
      const user = await insertUser({ email: testedEmail });

      expect(user?.email).toBe(testedEmail);
    });

    test("Trying to insert a new User without providing an email throws a ValidationError", async () => {
      await expect(insertUser({})).rejects.toThrow(ValidationError);
    });
  });
