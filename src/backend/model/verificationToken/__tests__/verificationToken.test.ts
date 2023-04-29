import { deleteVerificationTokenTests } from "./deleteVerificationToken.suite";
import { insertVerificationTokenTests } from "./insertVerificationToken.suite";
describe("Test VerificationToken operations", () => {
  insertVerificationTokenTests();
  deleteVerificationTokenTests();
});
