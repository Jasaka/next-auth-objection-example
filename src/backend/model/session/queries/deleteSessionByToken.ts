import Session from "../../../../../knex/models/Session";
import { AdapterSession } from "next-auth/adapters";

export default async function deleteSessionByToken(
  sessionToken: string
): Promise<AdapterSession | undefined> {
  return (await Session.query()
    .delete()
    .where("sessionToken", sessionToken)
    .returning("*")
    .first()) as unknown as AdapterSession;
}
