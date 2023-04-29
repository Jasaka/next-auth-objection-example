import User from "../../../../../knex/models/User";

export default async function getUserByUserId(
  userId: string
): Promise<User | undefined> {
  return User.query().findById(userId).whereNull("deletedAt").first();
}
