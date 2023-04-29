import User from "../../../../../knex/models/User";

export default async function getUserBySessionToken(
  sessionToken: string
): Promise<User> {
  return User.query()
    .joinRelated("sessions")
    .where("sessions.sessionToken", sessionToken)
    .whereNull("deletedAt")
    .first()
    .throwIfNotFound();
}
