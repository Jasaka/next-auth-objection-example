import { VerificationToken as AdapterVerificationToken } from "next-auth/adapters";
import { PartialModelObject } from "objection";
import VerificationToken from "../../../../../knex/models/VerificationToken";

export default async function insertVerificationToken(
  data: PartialModelObject<VerificationToken>
): Promise<AdapterVerificationToken> {
  return VerificationToken.query()
    .insert({
      expires: data.expires,
      identifier: data.identifier,
      token: data.token,
    })
    .returning("*")
    .first() as unknown as AdapterVerificationToken;
}
