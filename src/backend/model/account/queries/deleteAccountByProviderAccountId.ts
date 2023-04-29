import Account from "../../../../../knex/models/Account";
import { AdapterAccount } from "next-auth/adapters";

export default async function deleteAccountByProviderAccountId(
  providerAccountId: string,
  provider: string
): Promise<AdapterAccount | undefined> {
  return Account.query()
    .delete()
    .where("providerAccountId", providerAccountId)
    .andWhere("provider", provider)
    .returning("*")
    .first() as unknown as AdapterAccount;
}
