import Session from "../../../../../knex/models/Session";

export default async function getSessionByToken(
  sessionToken: string
): Promise<Session | undefined> {
  return Session.query().where("sessionToken", sessionToken).first();
}
