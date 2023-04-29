import User from "../../../../../knex/models/User";

export default async function getUserByEmail(
  email: string
): Promise<User | null> {
  return User.query()
    .findOne({ email })
    .whereNull("deletedAt")
    .returning("*")
    .first();
}
