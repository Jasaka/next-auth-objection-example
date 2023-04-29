import { deleteAccountTests } from "./deleteAccount.suite";
import { insertAccountTests } from "./insertAccount.suite";

describe("Test Account operations", () => {
  insertAccountTests();
  deleteAccountTests();
});
