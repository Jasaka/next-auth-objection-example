import VerificationToken from "../../../../../knex/models/VerificationToken";

export default async function getAndDeleteVerificationToken({
  identifier,
  token,
}: {
  identifier: string;
  token: string;
}): Promise<any> {
  return VerificationToken.query()
    .delete()
    .where("identifier", identifier)
    .where("token", token)
    .returning("*")
    .first();
}
