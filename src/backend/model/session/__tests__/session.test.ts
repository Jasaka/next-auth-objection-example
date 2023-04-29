import { updateSessionTests } from "./updateSession.suite";
import { deleteSessionTests } from "./deleteSession.suite";
import { getSessionTests } from "./getSession.suite";
import { insertSessionTests } from "./insertSession.suite";

describe("Test Session operations", () => {
  insertSessionTests();
  getSessionTests();
  deleteSessionTests();
  updateSessionTests();
});
