import { insertUserTests } from "./insertUser.suite";
import { updateUserTests } from "./updateUser.suite";
import { getUserTests } from "./getUser.suite";
import { deleteUserTests } from "./deleteUser.suite";

describe("Test User operations", () => {
  insertUserTests();
  updateUserTests();
  getUserTests();
  deleteUserTests();
});
