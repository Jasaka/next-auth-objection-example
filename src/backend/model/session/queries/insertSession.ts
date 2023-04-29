import Session from "../../../../../knex/models/Session";

export default async function insertSession({
  expires,
  sessionToken,
  userId,
}: {
  expires: Date;
  sessionToken: string;
  userId: string;
}): Promise<Session> {
  return Session.query()
    .insert({
      expires: expires.toDateString(),
      sessionToken: sessionToken,
      userId: userId,
    })
    .returning("*") as unknown as Promise<Session>;
}
