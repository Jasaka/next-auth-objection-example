import { Model } from "objection";
import {
  DateProperties,
  IntProperties,
  StringProperties,
  UuidProperties,
} from "./_properties";
import { Uuid } from "./_types";
import User from "./User";
import { connectModelIfNotConnected } from "../../knexfile";

connectModelIfNotConnected();

class Account extends Model {
  static tableName = "accounts";

  id!: Uuid;
  userId!: Uuid;
  type!: string;
  provider!: string;
  providerAccountId!: string;
  refreshToken?: string | null = null;
  accessToken?: string | null = null;
  expiresAt?: number | null = null;
  tokenType?: string | null = null;
  scope?: string | null = null;
  idToken?: string | null = null;
  sessionState?: string | null = null;
  oauthTokenSecret?: string | null = null;
  oauthToken?: string | null = null;
  insertedAt!: string;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["providerAccountId", "userId", "provider", "type"],
      properties: {
        id: UuidProperties,
        userId: UuidProperties,
        type: StringProperties,
        provider: StringProperties,
        providerAccountId: StringProperties,
        refreshToken: StringProperties,
        accessToken: StringProperties,
        expiresAt: IntProperties,
        tokenType: StringProperties,
        scope: StringProperties,
        idToken: StringProperties,
        sessionState: StringProperties,
        oauthTokenSecret: StringProperties,
        oauthToken: StringProperties,
        insertedAt: DateProperties,
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "accounts.userId",
          to: "users.id",
        },
      },
    };
  }
}

export default Account;
