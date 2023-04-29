import insertUser from "../queries/insertUser";
import updateUser from "../queries/updateUser";
import User from "../../../../../knex/models/User";
import { generateEmail, generateUuid } from "../../../../__test__/testUtils";

export const updateUserTests = () =>
  describe("Update User", () => {
    let user: User | undefined = undefined;
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });
    });

    test("Updating a User returns the updated user", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      const newEmail = generateEmail();

      const updatedUser = await updateUser({
        id: user.id,
        email: newEmail,
      });

      expect(updatedUser?.email).toBe(newEmail);
    });

    test("Trying to update a user without id throws an Error", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      await expect(
        updateUser({
          email: generateEmail(),
        })
      ).rejects.toThrow("User ID is required to update a user");
    });

    test("Trying to update a user with an invalid id returns undefined", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      const updatedUser = await updateUser({
        id: generateUuid(),
        email: generateEmail(),
      });
      expect(updatedUser).toBeUndefined();
    });
  });
