import Account from "../../../../../knex/models/Account";

export default async function insertAccount({
  providerAccountId,
  userId,
  provider,
  type,
}: any): Promise<Account> {
  return Account.query()
    .insert({
      userId,
      type,
      provider,
      providerAccountId,
    })
    .returning("*") as unknown as Promise<Account>;
}
