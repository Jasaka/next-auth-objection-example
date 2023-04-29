import insertUser from "../queries/insertUser";
import User from "../../../../../knex/models/User";
import {
  generateEmail,
  generateUuid,
  getTimestampPlusMinutes,
} from "../../../../__test__/testUtils";
import deleteUserByUserId from "../queries/deleteUserByUserId";
import getUserByUserId from "../queries/getUserByUserId";

export const deleteUserTests = () =>
  describe("Delete User", () => {
    let user: User | undefined = undefined;
    beforeAll(async () => {
      user = await insertUser({ email: generateEmail() });
    });

    test("Deleting a User returns a valid, sensible deletedAt Date", async () => {
      expect(user).toBeDefined();
      if (!user) return;

      const preDeletionTimestamp = getTimestampPlusMinutes(-2);
      const deletedUser: User = await deleteUserByUserId(user.id);
      const postDeletionTimestamp = getTimestampPlusMinutes(2);

      expect(deletedUser).toBeDefined();
      expect(deletedUser.deletedAt).toBeDefined();
      if (!deletedUser || !deletedUser.deletedAt) return;

      expect(Date.parse(deletedUser.deletedAt)).toBeGreaterThanOrEqual(
        Date.parse(preDeletionTimestamp.toDateString())
      );
      expect(Date.parse(deletedUser.deletedAt)).toBeLessThanOrEqual(
        Date.parse(postDeletionTimestamp.toDateString())
      );
    });

    test("Trying to delete a user with an invalid id throws a NotFoundError", async () => {
      const deletedUser = await deleteUserByUserId(generateUuid());
      expect(deletedUser).toBeUndefined();
    });

    test("Deleting a User means that the User is no longer retrievable", async () => {
      const newUser = await insertUser({ email: generateEmail() });

      expect(newUser).toBeDefined();
      if (!newUser) return;

      const newUserId = newUser.id;

      await deleteUserByUserId(newUserId);
      const deletedUser = await getUserByUserId(newUserId);
      expect(deletedUser).toBeUndefined();
    });
  });
