import User from "../../../../../knex/models/User";

export default async function getUserByProviderAndProviderAccountId(
  providerAccountId: string,
  provider: string
): Promise<User | null> {
  return User.query()
    .joinRelated("accounts")
    .where("accounts.provider", provider)
    .andWhere("accounts.providerAccountId", providerAccountId)
    .whereNull("deletedAt")
    .first() as unknown as User;
}
