import User from "../../../../../knex/models/User";

export default async function deleteUserByUserId(
  userId: string
): Promise<User> {
  return User.query()
    .patchAndFetchById(userId, {
      deletedAt: new Date().toDateString(),
    })
    .returning("*")
    .first();
}
