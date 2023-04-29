import { Model } from "objection";
import {
  DateProperties,
  StringProperties,
  UuidProperties,
} from "./_properties";
import { Uuid } from "./_types";
import { connectModelIfNotConnected } from "../../knexfile";

connectModelIfNotConnected();

class VerificationToken extends Model {
  static tableName = "verificationTokens";

  id!: Uuid;
  identifier!: string;
  token!: string;
  expires!: string;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["identifier", "token", "expires"],

      properties: {
        id: UuidProperties,
        identifier: StringProperties,
        token: StringProperties,
        expires: DateProperties,
      },
    };
  }
}

export default VerificationToken;
