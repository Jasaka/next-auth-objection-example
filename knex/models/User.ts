import { Model } from "objection";
import {
  DateProperties,
  StringProperties,
  UuidProperties,
} from "./_properties";
import { Uuid } from "./_types";
import Account from "./Account";
import Session from "./Session";
import { connectModelIfNotConnected } from "../../knexfile";

connectModelIfNotConnected();

class User extends Model {
  static tableName = "users";

  id!: Uuid;
  name?: string | null = null;
  email!: string;
  emailVerified?: string | null = null;
  image?: string | null = null;
  insertedAt!: string;
  deletedAt?: string | null = null;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],
      properties: {
        id: UuidProperties,
        name: StringProperties,
        email: StringProperties,
        emailVerified: DateProperties,
        image: StringProperties,
        insertedAt: DateProperties,
        deletedAt: DateProperties,
      },
    };
  }

  static get relationMappings() {
    return {
      accounts: {
        relation: Model.HasManyRelation,
        modelClass: Account,
        join: {
          from: "users.id",
          to: "accounts.userId",
        },
      },

      sessions: {
        relation: Model.HasManyRelation,
        modelClass: Session,
        join: {
          from: "users.id",
          to: "sessions.userId",
        },
      },
    };
  }
}

export default User;
