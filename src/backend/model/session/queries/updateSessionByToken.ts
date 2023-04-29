import Session from "../../../../../knex/models/Session";
import getSessionByToken from "./getSessionByToken";
import { AdapterSession } from "next-auth/adapters";

export default async function updateSessionByToken({
  expires,
  sessionToken,
}: Partial<AdapterSession | undefined> &
  Pick<AdapterSession, "sessionToken">): Promise<AdapterSession | undefined> {
  if (!sessionToken)
    throw new Error("Session token is required to update a session");
  const oldSession = await getSessionByToken(sessionToken);
  if (!expires) return oldSession as unknown as AdapterSession;
  if (!oldSession) return undefined;
  return Session.query().patchAndFetchById(oldSession.id, {
    expires: expires?.toDateString() || oldSession.expires,
  }) as unknown as AdapterSession;
}
