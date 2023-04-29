import { Model } from "objection";
import {
  DateProperties,
  StringProperties,
  UuidProperties,
} from "./_properties";
import { Uuid } from "./_types";
import User from "./User";
import { connectModelIfNotConnected } from "../../knexfile";

connectModelIfNotConnected();

class Session extends Model {
  static tableName = "sessions";

  id!: Uuid;
  expires!: string;
  sessionToken!: string;
  userId!: Uuid;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["expires", "sessionToken", "userId"],
      properties: {
        id: UuidProperties,
        expires: DateProperties,
        sessionToken: StringProperties,
        userId: UuidProperties,
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "sessions.userId",
          to: "users.id",
        },
      },
    };
  }
}

export default Session;
